import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import itemsData from "../assets/static-data/items.json";
import { v4 as uuid } from "uuid";

itemsData.map((item) => (item.id = uuid()));

export const useShopStore = defineStore("shop", () => {
	if (!loadItems()) {
		localStorage.setItem("items", JSON.stringify(itemsData));
	}

	const list = reactive({
		items: loadItems(),
		cart: loadCart() ? reactive(loadCart()) : reactive([]),
	});

	const total = computed(function () {
		return list.cart
			.reduce(function (total, item) {
				return total + item.price * item.quantity;
			}, 0)
			.toFixed(2);
	});

	function create(item) {
		if (!item.image) item.image = "https://peprojects.dev/images/square.jpg";
		let record = {
			name: item.name,
			price: item.price,
			image: item.image,
			id: uuid(),
		};
		items.push(record);
		item.name = "";
		item.price = 0;
		item.image = "";
		saveItems();
	}

	function erase(id) {
		list.items = list.items.filter(function (item) {
			return item.id != id;
		});
		saveCart();
	}

	function findInCart(item) {
		return list.cart.find(function (cartItem) {
			return cartItem.id == item.id;
		});
	}

	function add(item) {
		let found = findInCart(item);
		if (found) {
			quantityIncrement(found);
		} else {
			list.cart.push({
				//push item object into cart
				id: item.id,
				name: item.name,
				price: item.price,
				quantity: 1,
				image: item.image,
			});
		}
		saveCart();
	}

	function remove(item) {
		list.cart = list.cart.filter(function (cartItem) {
			return cartItem.id != item.id;
		});
		saveCart();
	}

	function quantityIncrement(item) {
		item.quantity++;
		saveCart();
	}

	function quantityDecrement(item) {
		item.quantity--;
		saveCart();
		if (item.quantity < 1) {
			remove(item.id);
		}
	}

	function saveItems() {
		localStorage.setItem("items", JSON.stringify(list.items));
	}

	function loadItems() {
		var itemsStr = localStorage.getItem("items");
		return JSON.parse(itemsStr);
	}

	function saveCart() {
		localStorage.setItem("cart", JSON.stringify(list.cart));
	}

	function loadCart() {
		var cartStr = localStorage.getItem("cart");
		return JSON.parse(cartStr);
	}

	return {
		list,
		total,
		create,
		erase,
		add,
		remove,
		quantityIncrement,
		quantityDecrement,
	};
});
