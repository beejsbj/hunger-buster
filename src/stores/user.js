import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { useCurrentUser } from "vuefire";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { useRouter } from "vue-router";

const router = useRouter();

export const useUserStore = defineStore("user", () => {
	const auth = getAuth();

	const current = useCurrentUser();

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

	function signUp(form) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
		clearForm(form);
	}

	function login(form) {
		signInWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
		clearForm(form);
	}

	function logout() {
		signOut(auth)
			.then(() => {
				router.push({ name: "home" });
			})
			.catch((error) => {
				// An error happened.
			});
	}

	function clearForm(form) {
		form.email = "";
		form.password = "";
	}

	return {
		profile,
		current,
		favoriteRestaurant,
		favoriteItem,
		signUp,
		login,
		logout,
	};
});
