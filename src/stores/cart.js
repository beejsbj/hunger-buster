import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
	const item = reactive({
		name: "",
		price: 0,
		quantity: 0,

	});

	const items = reactive([]);


	function total() {
		return items.reduce(function (total, item) {
			return total + item.total;
		}, 0);
	}

	function add() {
		if (!item.quantity) item.quantity = 1;
		let item = {
			name: item.name,
			price: item.price,
			quantity: item.quantity,
			total: item.price * item.quantity,
		};
		items.push(item);
		item.price = "";
		item.quantity = "";
	}

	return { item, items, total, add };
});
