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

	//

	//restaurants
	const restaurantRef = collection(db, "restaurants");
	const restaurants = useCollection(restaurantRef);

	//curret restaurant
	const slug = computed(() => {
		if (route.params.restaurantSlug) {
			return route.params.restaurantSlug;
		}
	});
	const queriedRestaurant = computed(() => {
		if (slug.value) {
			return query(restaurantRef, where("slug", "==", slug.value));
		}
	});
	const restaurant = useDocument(queriedRestaurant);

	//current restaurant's items
	const itemsRef = collection(db, "items");
	const queriedItems = computed(() => {
		if (restaurant.value) {
			return query(
				itemsRef,
				where("belongsTo", "==", restaurant?.value[0].id)
			);
		}
	});
	const items = useCollection(queriedItems);

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
				`cart_${restaurant?.value[0].id}`,
				"items"
			);
		}
	});
	const cart = useCollection(cartRef);

	const cartTotal = computed(function () {
		return cart?.value
			.reduce(function (total, item) {
				return total + item.price;
			}, 0)
			.toFixed(2);
	});

	console.log(cartTotal);

	// add to cart
	async function add(item) {
		//initiate cart doc and set its belongsTo property
		console.log(item);
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
			path: `/restaurant/${slug.value}/cart`,
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

	async function clearCart(cart) {
		cart.forEach(async function (item) {
			remove(item);
		});
		ui.notify(`Cart Cleared`);
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

		add,
		remove,
		clearCart,
		decrementQuantity,
		incrementQuantity,
	};
});
