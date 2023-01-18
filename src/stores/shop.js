import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import itemsData from "../assets/static-data/items.json";



export const useShopStore = defineStore("shop", () => {
	if (!loadItems()){
		localStorage.setItem("items", JSON.stringify(itemsData));
	}
	const items = loadItems();
	const cart = loadCart() ? reactive(loadCart()) : reactive([]);

	const total = computed(function () {
		return cart.reduce(function (total, item) {
			return total + item.total;
		}, 0).toFixed(2);
	});

	function addNewItem(item) {
		if (!item.image) item.image = "https://peprojects.dev/images/square.jpg";
		let record = {
			name: item.name,
			price: item.price,
			image: item.image,
		};
		items.push(record);
		item.name = "";
		item.price = 0;
		item.image = "";
		saveItems();
	}

	function add(item) {
		if (!item.quantity) item.quantity = 1;
		let record = {
			name: item.name,
			price: item.price,
			quantity: item.quantity,
			total: item.price * item.quantity,
		};
		cart.push(record);
		saveCart();
	}

	function remove(junk) {
		cart.filter(function(item) {
		    return item != junk;
		})
	}

	function saveItems() {
		localStorage.setItem("items", JSON.stringify(items));
	}

	function loadItems() {
		var itemsStr = localStorage.getItem("items");
		return JSON.parse(itemsStr);
	}

	function saveCart() {
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	function loadCart() {
		var cartStr = localStorage.getItem("cart");
		return JSON.parse(cartStr);
	}

	return { items, cart, total, add, addNewItem, remove };
});
