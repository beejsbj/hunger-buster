import { ref, computed, reactive, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import restaurantsData from "../assets/static-data/restaurants.json";
import { v4 as uuid } from "uuid";
import slug from "slug";
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";

const db = useFirestore();

if (!localStorage.restaurants) {
	localStorage.restaurants = useCollection(collection(db, "todos"));
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

	function add(item, restaurant, note) {
		console.log(note);
		let id = findRestaurant(restaurant.id);

		if (!restaurants[id].cart) {
			restaurants[id].cart = [];
		}

		let record = {
			...item,
			quantity: 1,
			id: uuid(),
			note: note,
		};

		restaurants[id].cart.push(record);
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
