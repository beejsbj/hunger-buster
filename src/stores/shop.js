import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import slug from "slug";
import {
	collection,
	doc,
	deleteDoc,
	addDoc,
	getDoc,
	updateDoc,
	arrayUnion,
	setDoc,
} from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./user";
import { getStorage } from "firebase/storage";
import { useFirebaseStorage, useStorageFile, useStorageFileUrl } from "vuefire";
import { ref as storageRef } from "firebase/storage";

///////////////////////////////////////////////////////

const db = useFirestore();
const storage = useFirebaseStorage();

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
			address: form.address,
			phone: form.phone,
			website: form.website ?? "",
			notes: form.notes ?? "",
			owner: user.id,
		};
		record.id = await getUniqueId(slug(form.name));

		//upload image
		const imageRef = storageRef(
			storage,
			`images/restaurants/${record.id}/thumbnail`
		);
		const { upload, url, refresh } = useStorageFile(imageRef);
		await upload(form.image);

		await refresh();
		console.log(url.value);
		record.image = url.value;

		// //add restaurant to db
		await setDoc(doc(db, "restaurants", record.id), record);

		//add restaurant  id to user's data
		await updateDoc(doc(db, "users", user.id), {
			restaurantsOwned: arrayUnion(record.id),
		});

		// //notify user
		ui.notify(`${record.name} Added Restaurant to store!`);

		//redirect to new restaurant
		router.push({
			path: `/restaurant/${record.id}`,
		});

		//clear form
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
		console.log(form);
		const record = {
			name: form.name,
			price: form.price,
			description: form.description ?? "",
			options: form.options ?? {},
			categories: form.categories ?? [],

			id: slug(form.name),
			slug: restaurant.value.id + "/" + slug(form.name),
			belongsTo: restaurant.value.id,
		};

		//upload image
		const imageRef = storageRef(
			storage,
			`images/restaurants/${restaurant.value.id}/menuItems/${record.id}/thumbnail`
		);
		const { upload, url, refresh } = useStorageFile(imageRef);
		await upload(form.image);
		await refresh();
		record.image = url.value;

		//add item to db
		await setDoc(
			doc(db, "restaurants", restaurant.value.id, "menuItems", record.id),
			record
		);

		//notify user
		ui.notify(`${record.name} Added Item to store!`);

		//clear form and local storage
		localStorage.setItem(
			`${restaurant.value.id}-itemForm`,
			JSON.stringify({})
		);

		//redirect to new item
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
	async function getUniqueId(id, i = 0, originalId = id) {
		const { data: found, promise } = useDocument(doc(db, "restaurants", id));
		const foundID = ref(null);

		await promise.value
			.then(async function () {
				console.log(found.value.id, "exists");
				i++;
				var newId = originalId + "-" + i;
				foundID.value = await getUniqueId(newId, i, originalId);
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
