//

import { useCollection } from "vuefire";
import { v4 as uuid } from "uuid";
import {
	collection,
	query,
	where,
	doc,
	limit,
	setDoc,
} from "firebase/firestore";

//
const db = useFirestore();

function getCarts() {
	const user = useUserStore();
	const cartsRef = computed(function () {
		if (user?.id) {
			return collection(db, "users", user?.id, "carts");
		}
	});
	const carts = useCollection(cartsRef);
	return carts;
}

export const useCartsStore = defineStore("carts", (restaurant = "") => {
	///////////////////////////////////////////////////
	const shop = useShopStore();
	const user = useUserStore();
	const ui = useInterfaceStore();
	const carts = getCarts();
	// const cart = getCart(shop.restaurant[0]);
	///////////////////////////////////////////////////

	function getCart(restaurant) {
		const foundCart = carts.value.find((cart) => cart.id == restaurant.id);
		return foundCart;
	}

	// add to cart
	async function add(item, note) {
		item.note = note;

		//initiate cart doc and set its belongsTo property
		await setDoc(doc(db, "users", user?.id, "carts", item.belongsTo), {
			belongsTo: item.belongsTo,
			// items: [...currentItems, item],
		});

		//add item to items collection within cart doc
		await setDoc(
			doc(db, "users", user?.id, "carts", item.belongsTo, "items", item.id),
			item
		);

		ui.notify("Item Added");
	}

	// remove from cart
	async function remove(item) {
		await deleteDoc(
			doc(db, "users", user?.id, "carts", item.belongsTo, "items", item.id)
		);
	}

	///////////////////////////////////////////////////////
	return {
		// getCarts,
		add,
		remove,
		// getCart,
		carts,
		// cartItems
	};
});
