//imports
import { useCurrentUser, useDocument, useCollection } from "vuefire";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import {
	collection,
	updateDoc,
	where,
	query,
	getDoc,
	setDoc,
} from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
///////////////////////////////////////////////////////

//setup
const db = useFirestore();

///////////////////////////////////////////////////////

// /store
export const useUserStore = defineStore("user", () => {
	const ui = useInterfaceStore();
	const router = useRouter();
	const route = useRoute();

	const auth = getAuth();
	const current = useCurrentUser();
	const shop = useShopStore();
	///////////////////////////////////////////////////////

	const userRef = computed(function () {
		if (current.value?.uid) {
			return doc(collection(db, "users"), current.value.uid);
		}
	});
	const { data: userDoc, promise: getUserDoc } = useDocument(userRef);

	//compute
	const email = computed(() => current.value?.email);
	const emailVerified = computed(() => current.value?.emailVerified);
	const id = computed(() => userDoc.value?.id);

	const isAdmin = computed(() => userDoc.value?.roles.admin);
	const isBusinessOwner = computed(() => userDoc.value?.roles?.business);

	const profile = computed(() => userDoc.value?.profile);

	const restaurantsQuery = computed(() => {
		if (isBusinessOwner.value) {
			console.log(current.value?.uid);

			return query(
				collection(db, "restaurants"),
				where("owner", "==", current?.value.uid)
			);
		}
	});
	const restaurants = useCollection(restaurantsQuery);

	///////////////////////////////////////////////////////
	// functions
	function favoriteRestaurant(restaurant) {
		const found = profile.value.favoriteRestaurants.find(function (favorite) {
			return favorite.id == restaurant.id;
		});
		if (found) {
			let index = profile.value.favoriteRestaurants.indexOf(restaurant);
			profile.value.favoriteRestaurants.splice(index, 1);
			ui.notify(`${restaurant.name} removed from favorites`);
		} else {
			profile.value.favoriteRestaurants.push(restaurant);
			ui.notify(`${restaurant.name} saved to favorites`);
		}
	}

	function favoriteItem(item) {
		const found = profile.value.favoriteItems.find(function (favorite) {
			return favorite.id == item.id;
		});
		if (found) {
			let index = profile.value.favoriteItems.indexOf(item);
			profile.value.favoriteItems.splice(index, 1);
			ui.notify(`${item.name} removed from favorites`);
		} else {
			profile.value.favoriteItems.push(item);
			ui.notify(`${item.name} saved to favorites`);
		}
	}

	function isItemFavorite(item) {
		const found = profile.value.favoriteItems.find(function (favorite) {
			return favorite.id == item.id;
		});
		if (found) {
			return true;
		} else {
			return false;
		}
	}

	/// authorization ///
	function signUp(form) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const user = userCredential.user;
				setDoc(doc(db, "users", user.uid), {
					id: user.uid,
					roles: {},
					profile: {
						displayName: form.displayName ?? "Display Name",
						image: "https://peprojects.dev/images/square.jpg",
						description:
							"Lorem, this is the profile description, edit it to your liking, thuugh that feature might not exist yet tehe. Ipsum",
						favoriteRestaurants: [],
						favoriteItems: [],
					},
				}).then(() => {
					router.push("/user");
				});
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
		clearForm(form);
	}
	function businessSignUp(form) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const user = userCredential.user;
				setDoc(doc(db, "users", user.uid), {
					id: user.uid,
					roles: {
						business: true,
					},
					profile: {
						displayName: form.displayName ?? "Business Name",
						image: "https://peprojects.dev/images/square.jpg",
						description:
							"Lorem, this is the business profile description, edit it to your liking, thuugh that feature might not exist yet tehe. Ipsum",
						favoriteRestaurants: [],
						favoriteItems: [],
						restaurantsOwned: [],
					},
				}).then(() => {
					router.push("/user");
				});
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
				router.push(route.query.redirect || "/user");
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
		clearForm(form);
	}
	function businessLogin(form) {
		signInWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const user = userCredential.user;
				// check if user has business role
				const userDoc = getDoc(doc(db, "users", user.uid));
				userDoc.then((userDoc) => {
					if (!userDoc.data()?.roles?.business) {
						ui.notify("You are not a business owner");
						signOut(auth);
						router.push({ name: "userLogin" });
						ui.notify("Login as a user instead");
						return;
					} else {
						router.push(route.query.redirect || "/user");
					}
				});
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
				ui.notify("Logged out");
			})
			.catch((error) => {});
	}

	function clearForm(form) {
		form.email = "";
		form.password = "";
	}

	///////////////////////////////////////////////////////

	watch(
		profile,
		async function (after, before) {
			const userRef = doc(db, "users", id.value);
			await updateDoc(userRef, {
				profile: after,
			});
		},
		{ deep: true }
	);

	///////////////////////////////////////////////////////
	return {
		current,
		restaurants,
		favoriteRestaurant,
		favoriteItem,
		isItemFavorite,

		signUp,
		login,
		logout,
		businessSignUp,
		businessLogin,

		isAdmin,
		isBusinessOwner,
		profile,
		id,
		email,
	};
});
