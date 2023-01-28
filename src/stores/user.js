import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useUserStore = defineStore("user", () => {
	const profile = reactive({
		name: "Burooj",
		image: "https://peprojects.dev/images/square.jpg",
		favoriteRestaurants: [],
		favoriteItems: [],
	});

	function favoriteRestaurant(restaurant) {
		if (profile.favoriteRestaurants.includes(restaurant)) {
			let index = profile.favoriteRestaurants.indexOf(restaurant);
			profile.favoriteRestaurants.splice(index, 1);
		} else {
			profile.favoriteRestaurants.push(restaurant);
		}
	}
	function favoriteItem(item) {
		if (profile.favoriteItems.includes(item)) {
			let index = profile.favoriteItems.indexOf(item);
			profile.favoriteItems.splice(index, 1);
		} else {
			profile.favoriteItems.push(item);
		}
	}

	function saveProfile() {
		localStorage.setItem("profile", JSON.stringify(profile));
		console.log("Profile Saved");
	}
	watch(profile, function () {
		saveProfile();
	});

	return {
		profile,
		favoriteRestaurant,
		favoriteItem,
	};
});
