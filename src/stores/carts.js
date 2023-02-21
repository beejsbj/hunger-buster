//

import { useCollection } from "vuefire";
import { v4 as uuid } from "uuid";


//

export const useCartsStore = defineStore("carts", () => {
	const user = useUserStore();
	const db = useFirestore();
	const ui = useInterfaceStore();

	// const cartsRef = computed(function () {
	// 	return collection(db, "users", `user_${user?.id}`, "carts");
	// });

	// const carts = useCollection(cartsRef);
	const carts = [];

	// user goes to restaurant detail
	//user adds an item to cart
	// add new document to subcollection, using restaurant id

	

	function getCart(id) {
		const docRef = computed(() =>
			doc(db, "users", user?.id, "carts", `cart_${id}`)
		);
		return useDocument(docRef);
	}

	async function add(item, note) {
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


		await setDoc(
			doc(
				db,
				"users",
				user?.id,
				"carts",
				`cart_${item.belongsTo}`
			),
			cart
		);

		ui.notify("Item Added");
	}

	//

	return {
		carts,
		add,
	};
});
