import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import slug from "slug";
import { collection, query, where, doc, limit } from "firebase/firestore";

const db = useFirestore();

export const useShopStore = defineStore("shop", () => {
	const restaurantRef = collection(db, "restaurants");
	const cartsRef = collection(db, "carts");

	const restaurants = useCollection(restaurantRef);

	function getRestaurant(slug) {
		const queried = query(restaurantRef, where("slug", "==", slug));
		const restaurant = useDocument(queried);
		return restaurant;
	}

	function findInCart(item) {
		return restaurant.id.find(function (cartItem) {
			return cartItem.id == item.id;
		});
	}

	function findRestaurant(id) {
		return restaurants.findIndex((restaurant) => restaurant.id == id);
	}

	function add(item, note) {
		const foundCart = getCart(item.belongsTo);

		const cart = { ...foundCart.value };

		let record = {
			...item,
			quantity: 1,
			id: uuid(),
			note: note,
		};

		if (!cart.items) {
			cart.items = [];
		}
		if (!cart.belongsTo) {
			cart.belongsTo = item.belongsTo;
		}

		cart.items.push(record);

		setDoc(doc(db, "carts", `cart_${item.belongsTo}`), cart);
	}

	async function remove(removedItem) {
		var foundCart = getCart(removedItem.belongsTo);

		const cart = { ...foundCart.value };

		cart.items = cart.items.filter(function (item) {
			return item.id != removedItem.id;
		});

		setDoc(doc(db, "carts", `cart_${removedItem.belongsTo}`), cart);
	}

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

	function getCart(id) {
		const docRef = computed(() => doc(collection(db, "carts"), `cart_${id}`));
		return useDocument(docRef);
	}



	onMounted(function () {
		console.log("loaded");
	});

	return {
		restaurants,
		getRestaurant,
		// total,
		add,
		remove,
		decrementQuantity,
		incrementQuantity,
		getCart,
	};
});
