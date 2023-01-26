import { ref, computed, reactive, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import itemsData from "../assets/static-data/items.json";
import { v4 as uuid } from "uuid";
import slug from "slug";

if (!localStorage.restaurants) {
	const data = fetch(
		"https://raw.githubusercontent.com/perpetual-education/restaurants-data/main/data.json"
	);
	data
		.then(function (data) {
			return data.json();
		})
		.then(function (json) {
			localStorage.restaurants = JSON.stringify(json);
		});
}

export const useShopStore = defineStore("shop", () => {
	const list = reactive({
		restaurants: loadRestaurants(),
		cart: loadCart() ? reactive(loadCart()) : reactive([]),
	});

	const total = computed(function () {
		return list.cart
			.reduce(function (total, restaurant) {
				return total + restaurant.price * restaurant.quantity;
			}, 0)
			.toFixed(2);
	});

	function create(restaurant) {
		let record = {
			name: restaurant.name,
			price: restaurant.price,
			image: restaurant.image,
			id: uuid(),
			slug: slug(restaurant.name),
		};
		list.restaurants.push(record);
		restaurant.name = "";
		restaurant.price = 0;
		restaurant.image = "";
	}

	function erase(restaurant) {
		list.restaurants = list.restaurants.filter(function (storeItem) {
			return storeItem.id != restaurant.id;
		});
	}

	function findInCart(restaurant) {
		return list.cart.find(function (cartItem) {
			return cartItem.id == restaurant.id;
		});
	}

	function add(restaurant) {
		let found = findInCart(restaurant);
		if (found) {
			quantityIncrement(found);
		} else {
			//push restaurant object into cart
			let record = restaurant;
			list.cart.push({
				id: restaurant.id,
				name: restaurant.name,
				price: restaurant.price,
				quantity: 1,
				image: restaurant.image,
			});
		}
	}

	function remove(restaurant) {
		list.cart = list.cart.filter(function (cartItem) {
			return cartItem.id != restaurant.id;
		});
	}

	function quantityIncrement(restaurant) {
		restaurant.quantity++;
	}

	function quantityDecrement(restaurant) {
		restaurant.quantity--;
		if (restaurant.quantity < 1) {
			remove(restaurant);
		}
	}

	function saveRestaurants() {
		localStorage.setItem("restaurants", JSON.stringify(list.restaurants));
		console.log("Restaurants Saved");
	}

	function loadRestaurants() {
		var restaurantsStr = localStorage.getItem("restaurants");
		return JSON.parse(restaurantsStr);
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
		saveRestaurants();
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
