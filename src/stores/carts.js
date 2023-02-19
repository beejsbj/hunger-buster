//

import { useCollection } from "vuefire";

//

export const useCartsStore = defineStore("carts", () => {
	const user = useUserStore();
	const db = useFirestore();

	const cartsRef = computed(function () {
		return collection(db, "users", `user_${user?.id}`, "carts");
	});
	
	const carts = useCollection(cartsRef);

	//

	function getCart(id) {
		const docRef = computed(() => doc(cartsRef, `cart_${id}`));
		return useDocument(docRef);
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

		setDoc(
			doc(
				collection(db, "users", `user_${user?.id}`, "carts"),
				`cart_${item.belongsTo}`
			),
			cart
		);
	}

	//

	return {
		carts,
		add,
	};
});
