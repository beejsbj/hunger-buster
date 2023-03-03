import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { useCollection } from "vuefire";
import slug from "slug";
import {
	collection,
	query,
	where,
	doc,
	deleteDoc,
	addDoc,
} from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./user";
///////////////////////////////////////////////////////

const db = useFirestore();

//////
export const useShopStore = defineStore("shop", () => {
	///////////////////////////////////////////////////

	const router = useRouter();
	const route = useRoute();
	const user = useUserStore();
	const ui = useInterfaceStore();

	///////////////////////////////////////////////////

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
			return collection(
				db,
				"users",
				user?.id,
				"carts",
				`cart_${restaurant?.value.id}`,
				"items"
			);
		}
	});
	const cart = useCollection(cartRef);

	//cart total
	const cartTotal = computed(function () {
		return cart?.value
			.reduce(function (total, item) {
				return total + item.price;
			}, 0)
			.toFixed(2);
	});

	//cart count
	const cartCount = computed(function () {
		const count = cart?.value.reduce(function (total, item) {
			return total + (item.quantity ? item.quantity : 1);
		}, 0);

		return count;
	});

	////////////////////////////////////////////

	//add restaurant
	async function addRestaurant(form) {
		const record = {
			name: form.name,
			image: form.image,
			phone: form.phone,
			address: form.address,
			city: form.city,
			state: form.state,
			zip: form.zip,
			website: form.website,
			notes: form.notes,
		};
		record.id = await idSlugger(slug(form.name));
		console.log(record.id);

		await setDoc(doc(db, "restaurants", record.id), record);

		ui.notify(`${record.name} Added Restaurant to store!`);
	}

	// add to cart
	async function add(item) {
		//initiate cart doc and set its belongsTo property
		await setDoc(
			doc(db, "users", user?.id, "carts", `cart_${item.belongsTo}`),
			{
				belongsTo: item.belongsTo,
				// items: [...currentItems, item],
			}
		);

		//add item to items collection within cart doc
		await addDoc(
			collection(
				db,
				"users",
				user?.id,
				"carts",
				`cart_${item.belongsTo}`,
				"items"
			),
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
			doc(
				db,
				"users",
				user?.id,
				"carts",
				`cart_${item.belongsTo}`,
				"items",
				item.id
			)
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

		setDoc(doc(db, "carts", `cart_${updatedItem.belongsTo}`), cart);
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

		setDoc(doc(db, "carts", `cart_${updatedItem.belongsTo}`), cart);
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
		cartTotal,
		cartCount,

		addRestaurant,

		add,
		remove,
		clearCart,
		decrementQuantity,
		incrementQuantity,
	};
});
