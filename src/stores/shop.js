import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import slug from "slug";
import {
	collection,
	doc,
	deleteDoc,
	addDoc,
	updateDoc,
	arrayUnion,
	setDoc,
} from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./user";
import { async } from "@firebase/util";
///////////////////////////////////////////////////////

const db = useFirestore();

//////
export const useShopStore = defineStore("shop", () => {
	///////////////////////////////////////////////////

	const router = useRouter();
	const route = useRoute();
	const user = useUserStore();
	const ui = useInterfaceStore();

	/////////////////////////////////////////////////////

	//restaurants
	const restaurants = useCollection(collection(db, "restaurants"));

	//current restaurant
	const slugID = computed(() => {
		if (route.params.restaurantSlug) {
			return route.params.restaurantSlug;
		}
	});
	const restaurantDocRef = computed(() => {
		if (slugID.value) {
			return doc(db, "restaurants", slugID.value);
		}
	});
	const { data: restaurant, promise: restaurantPromise } =
		useDocument(restaurantDocRef);

	//current restaurant's items
	const itemsRef = computed(() => {
		if (restaurant.value) {
			return collection(db, "restaurants", restaurant.value.id, "menuItems");
		}
	});
	const items = useCollection(itemsRef);

	//all user's carts
	const cartsRef = computed(() => {
		if (user.id) {
			return collection(db, "users", user?.id, "carts");
		}
	});
	const carts = useCollection(cartsRef);

	//current restaurant's cart
	const cartRef = computed(() => {
		if (restaurant.value && user.id) {
			return doc(db, "users", user?.id, "carts", restaurant?.value.id);
		}
	});
	const { data: cartDoc, promise: cartPromise } = useDocument(cartRef);

	const cartItemsRef = computed(() => {
		if (restaurant.value && user.id) {
			return collection(
				db,
				"users",
				user?.id,
				"carts",
				restaurant?.value.id,
				"items"
			);
		}
	});

	const cart = useCollection(cartItemsRef);

	//cart total
	const cartTotal = computed(() => {
		let total = 0;

		if (!cart.value || !cart.value.length) {
			return total.toFixed(2);
		}

		cart.value.forEach((item) => {
			let itemTotal = item.price;

			if (!item.options) {
				item.totalPrice = itemTotal;
				total += itemTotal;
				return;
			}

			item.options.forEach((option) => {
				const optionTotal = option.choices.reduce((acc, choice) => {
					if (choice.selected) {
						acc += parseInt(choice.price);
					}
					return acc;
				}, 0);

				itemTotal += optionTotal;
			});

			item.totalPrice = itemTotal;
			total += itemTotal;
		});

		return total.toFixed(2);
	});

	//cart count
	const cartCount = computed(function () {
		const count = cart?.value.reduce(function (total, item) {
			return total + (item.quantity ? item.quantity : 1);
		}, 0);

		return count;
	});

	//cart tip
	const cartTip = computed(() => {
		const tip = cartTotal.value * 0.15;
		return tip.toFixed(2);
	});

	////////////////////////////////////////////

	//add restaurant
	async function addRestaurant(form) {
		const record = {
			name: form.name,
			image: form.image,
			phone: form.phone,
			address: form.address,
			website: form.website,
			notes: form.notes,
			owner: user.id,
		};
		console.log(record.address);
		record.id = await idSlugger(slug(form.name));

		await setDoc(doc(db, "restaurants", record.id), record);

		await updateDoc(doc(db, "users", user.id), {
			restaurantsOwned: arrayUnion(record.id),
		});

		ui.notify(`${record.name} Added Restaurant to store!`);

		router.push({
			path: `/restaurant/${record.id}`,
		});
		localStorage.setItem("restaurantForm", JSON.stringify({}));
	}

	//delete restaurant
	async function deleteRestaurant(restaurant) {
		await deleteDoc(doc(db, "restaurants", restaurant.id));
		ui.notify(`${restaurant.name} Deleted`);

		router.push({
			path: `/restaurants`,
		});
	}

	//add item
	async function createItem(form) {
		const record = {
			name: form.name,
			image: form.image,
			price: form.price,
			description: form.description,
			options: form.options,
			categories: form.categories,

			id: slug(form.name),
			slug: restaurant.value.id + "/" + slug(form.name),
			belongsTo: restaurant.value.id,
		};

		console.log(record);

		// if (form.categories) {
		// 	const newCategories = form.categories.map((category) => {
		// 		const found = restaurant.value.categories.find(
		// 			(cat) => cat.value === category
		// 		);
		// 		if (found) {
		// 			return { ...found };
		// 		} else {
		// 			return {
		// 				value: slug(category),
		// 				label: category,
		// 			};
		// 		}
		// 	});

		// 	console.log(newCategories);
		// 	record.categories = newCategories;
		// }

		// await updateDoc(doc(db, "restaurants", restaurant.value.id), {
		// 	categories: record.categories,
		// });

		await setDoc(
			doc(db, "restaurants", restaurant.value.id, "menuItems", record.id),
			record
		);

		ui.notify(`${record.name} Added Item to store!`);

		localStorage.setItem(
			`${restaurant.value.id}-itemForm`,
			JSON.stringify({})
		);

		router.push({
			path: `/restaurant/${record.slug}`,
		});
	}

	async function addCategory(option, select$) {
		console.log("addCategory", option, select$);

		option.value = slug(option.label);

		await updateDoc(doc(db, "restaurants", restaurant.value.id), {
			categories: arrayUnion(option),
		});
		return option;
	}

	async function deleteItem(item) {
		await deleteDoc(
			doc(db, "restaurants", restaurant.value.id, "menuItems", item.id)
		);
		ui.notify(`${item.name} Deleted`);
	}

	// add to cart
	async function add(item) {
		//initiate cart doc and set its belongsTo property
		await setDoc(doc(db, "users", user?.id, "carts", item.belongsTo), {
			belongsTo: item.belongsTo,
			// items: [...currentItems, item],
		});

		//add item to items collection within cart doc
		await addDoc(
			collection(db, "users", user?.id, "carts", item.belongsTo, "items"),
			item
		);

		ui.notify(`${item.name} Added to Cart`);

		router.push({
			path: `/restaurant/${slugID.value}/cart`,
		});
	}

	// remove from cart
	async function remove(item) {
		await deleteDoc(
			doc(db, "users", user?.id, "carts", item.belongsTo, "items", item.id)
		);
		ui.notify(`${item.name} Removed`);
	}

	// clear cart
	async function clearCart(cart) {
		cart.forEach(async function (item) {
			remove(item);
		});
		ui.notify(`Cart Cleared`);
	}

	// increment quantity
	function incrementQuantity(updatedItem) {
		var foundCart = getCart(updatedItem.belongsTo);

		const cart = { ...foundCart.value };
		cart.items = cart.items.map(function (item) {
			if (updatedItem.id == item.id) {
				item.quantity += 1;
			}
			return item;
		});

		setDoc(doc(db, "carts", updatedItem.belongsTo), cart);
	}

	// decrement quantity
	function decrementQuantity(updatedItem) {
		var foundCart = getCart(updatedItem.belongsTo);

		const cart = { ...foundCart.value };
		cart.items = cart.items.map(function (item) {
			if (updatedItem.id == item.id) {
				item.quantity -= 1;
			}
			if (item.quantity > 0) {
				return item;
			}
		});

		setDoc(doc(db, "carts", updatedItem.belongsTo), cart);
	}

	///////////////////////////////////////////////////

	//helper functions
	async function idSlugger(id, i = 0, originalId = id) {
		const { data: found, promise } = useDocument(doc(db, "restaurants", id));
		const foundID = ref(null);

		await promise.value
			.then(async function () {
				console.log(found.value.id, "exists");
				i++;
				var newId = originalId + "-" + i;
				foundID.value = await idSlugger(newId, i, originalId);
			})
			.catch(() => {
				foundID.value = id;
			});

		return foundID.value;
	}

	///////////////////////////////////////////////////

	// watch forchanges in cart

	onMounted(function () {
		console.log("loaded");
	});

	///////////////////////////////////////////////////

	return {
		restaurants,
		carts,

		restaurant,
		items,
		cart,
		cartCount,
		cartTotal,

		addRestaurant,
		deleteRestaurant,
		createItem,
		deleteItem,
		addCategory,

		add,
		remove,
		clearCart,
		decrementQuantity,
		incrementQuantity,
	};
});
