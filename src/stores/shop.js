import { ref, computed, reactive, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import restaurantsData from "../assets/static-data/restaurants.json";
import { v4 as uuid } from "uuid";
import slug from "slug";

if (!localStorage.restaurants) {
	localStorage.restaurants = JSON.stringify(restaurantsData);
	// const data = fetch(
	// 	"https://raw.githubusercontent.com/perpetual-education/restaurants-data/main/data.json"
	// );
	// data
	// 	.then(function (data) {
	// 		return data.json();
	// 	})
	// 	.then(function (json) {
	// 		localStorage.restaurants = JSON.stringify(json);
	// 	});
}

export const useShopStore = defineStore("shop", () => {
	const restaurants = reactive(loadRestaurants());

	function findInCart(item) {
		return restaurant.id.find(function (cartItem) {
			return cartItem.id == item.id;
		});
	}

	function findRestaurant(id) {
		return restaurants.findIndex((restaurant) => restaurant.id == id);
	}

	function add(item, restaurant) {
		let id = findRestaurant(restaurant.id);

		if (!restaurants[id].cart) {
			restaurants[id].cart = [];
		}

		item.quantity = 1;
		restaurants[id].cart.push(item);
	}

	function remove(item, restaurant) {
		let id = findRestaurant(restaurant.id);

		restaurants[id].cart = restaurants[id].cart.filter(function (cartItem) {
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

	function saveRestaurants() {
		localStorage.setItem("restaurants", JSON.stringify(restaurants));
		console.log("Restaurants Saved");
	}

	function loadRestaurants() {
		var restaurantsStr = localStorage.getItem("restaurants");
		return JSON.parse(restaurantsStr);
	}

	watch(restaurants, function () {
		saveRestaurants();
	});

	onMounted(function () {
		console.log("loaded");
	});

	return {
		restaurants,
		// total,
		add,
		remove,
		quantityIncrement,
		quantityDecrement,
	};
});
