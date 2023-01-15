import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
	

	const items = reactive([]);

	const total = computed(function () {
		return items.reduce(function (total, item) {
			return total + item.total;
		}, 0);
	});

	// function total() {
	// 	return items.reduce(function (total, item) {
	// 		return total + item.total;
	// 	}, 0);
	// }

	function add(item) {
		if (!item.quantity) item.quantity = 1;
		let record = {
			name: item.name,
			price: item.price,
			quantity: item.quantity,
			total: item.price * item.quantity,
		};
		items.push(record);
		item.name = "";
		item.price = "";
		item.quantity = "";
		console.log(items);

	}

	return { items, total, add };
});
