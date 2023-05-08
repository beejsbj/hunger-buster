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
	GeoPoint,
} from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { async } from "@firebase/util";
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
	const address = computed(() => userDoc.value?.address);

	//all user's orders
	const ordersRef = computed(() => {
		if (id.value) {
			return collection(db, "users", id.value, "orders");
		}
	});
	const orders = useCollection(ordersRef);

	//current order
	const orderSlug = computed(() => {
		if (route.params.orderID) {
			return route.params.orderID;
		}
	});

	const order = computed(() => {
		if (route.params.orderID) {
			return orders.value.find(function (order) {
				return order.id == route.params.orderID;
			});
		}
	});

	const restaurantsQuery = computed(() => {
		if (isBusinessOwner.value) {
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
		if (isRestaurantFavorite(restaurant)) {
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
		if (isItemFavorite(item)) {
			let index = profile.value.favoriteItems.indexOf(item);
			profile.value.favoriteItems.splice(index, 1);
			ui.notify(`${item.name} removed from favorites`);
		} else {
			profile.value.favoriteItems.push(item);
			ui.notify(`${item.name} saved to favorites`);
		}
	}

	function isRestaurantFavorite(restaurant) {
		const found = profile?.value?.favoriteRestaurants.find(function (
			favorite
		) {
			return favorite.id == restaurant.id;
		});

		if (found) {
			return true;
		} else {
			return false;
		}
	}

	function isItemFavorite(item) {
		const found = profile?.value?.favoriteItems.find(function (favorite) {
			return favorite.id == item.id;
		});

		if (found) {
			return true;
		} else {
			return false;
		}
	}

	async function placeOrder(order) {
		const orderRef = await addDoc(
			collection(db, "users", current.value.uid, "orders"),
			{
				...order,
				placed: new Date().getTime(),
				placedBy: current.value.uid,
				status: "pending",
				placedAt: { ...address.value },
			}
		);
		shop.clearCart(order.items);
		router.push("/user/orders");
	}

	/// authorization ///
	function signUp(form) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const user = userCredential.user;
				setDoc(doc(db, "users", user.uid), {
					id: user.uid,
					address: {},
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
					window.location.href = "/user";
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
					address: {},
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
					window.location.href = "/user";
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

				window.location.href = route.query.redirect || "/user";
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
						window.location.href = route.query.redirect || "/user";
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
				// router.push({ name: "home" });
				window.location.href = "/";
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

	async function setUserLocation(place) {
		place.geometry.location.lat = place.geometry.location.lat();
		place.geometry.location.lng = place.geometry.location.lng();

		console.log(place);

		if (id.value) {
			await updateDoc(doc(db, "users", id.value), {
				address: {
					place_id: place.place_id,
					location: {
						lat: place.geometry.location.lat,
						lng: place.geometry.location.lng,
					},
					name: place.name,
					formatted_address: place.formatted_address,
				},
			});
		}
	}

	///////////////////////////////////////////////////////
	return {
		auth,
		current,
		restaurants,
		orders,
		order,

		favoriteRestaurant,
		favoriteItem,
		isItemFavorite,
		signUp,
		login,
		logout,
		businessSignUp,
		businessLogin,
		placeOrder,

		isAdmin,
		isBusinessOwner,
		profile,
		address,
		id,
		email,
		setUserLocation,
		isRestaurantFavorite,
	};
});
