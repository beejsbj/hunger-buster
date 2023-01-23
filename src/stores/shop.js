import { ref, computed, reactive, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import itemsData from "../assets/static-data/items.json";
import { v4 as uuid } from "uuid";
import slug from "slug";

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
		let record = {
			name: item.name,
			price: item.price,
			image: item.image
				? item.image
				: "https://peprojects.dev/images/square.jpg",
			id: item.id,
			slug: item.slug,
		};
		list.items.push(record);
		item.name = "";
		item.price = 0;
		item.image = "";
	}

	function erase(item) {
		list.items = list.items.filter(function (storeItem) {
			return storeItem.id != item.id;
		});
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
			//push item object into cart
			let record = item;
			list.cart.push({
				id: item.id,
				name: item.name,
				price: item.price,
				quantity: 1,
				image: item.image,
			});
		}
	}

	function remove(item) {
		list.cart = list.cart.filter(function (cartItem) {
			return cartItem.id != item.id;
		});
	}

	function quantityIncrement(item) {
		item.quantity++;
	}

	function quantityDecrement(item) {
		item.quantity--;
		if (item.quantity < 1) {
			remove(item);
		}
	}

	function saveItems() {
		localStorage.setItem("items", JSON.stringify(list.items));
		console.log("Items Saved");
	}

	function loadItems() {
		var itemsStr = localStorage.getItem("items");
		return JSON.parse(itemsStr);
	}

	function saveCart() {
		localStorage.setItem("cart", JSON.stringify(list.cart));
		console.log("Cart saved");
	}

	function loadCart() {
		var cartStr = localStorage.getItem("cart");
		return JSON.parse(cartStr);
	}

	watch(list, function () {
		saveCart();
		saveItems();
	});

	onMounted(function () {
		console.log("loaded");
	});

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
