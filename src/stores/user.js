//imports
import { useCurrentUser, useDocument } from "vuefire";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { collection } from "firebase/firestore";

//setup
const router = useRouter();
const db = useFirestore();

function getUser() {
	const current = useCurrentUser();

	const userRef = computed(function () {
		if (current.value?.uid) {
			return doc(collection(db, "users"), `user_${current.value.uid}`);
		}
	});
	const userDoc = useDocument(userRef);

	//compute returns
	const roles = computed(() => userDoc.value?.roles);
	const id = computed(() => userDoc.value?.id);
	const profile = computed(() => userDoc.value?.profile);
	return { id, roles, profile };
}


// /store
export const useUserStore = defineStore("user", () => {
	const auth = getAuth();
	const current = useCurrentUser();
	const { id, roles, profile } = getUser();

	//

	//

	// functions
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
				setDoc(doc(db, "users", `user_${user.uid}`), {
					id: user.uid,
					roles: {},
					profile: {
						displayName: form.displayName ?? "Display Name",
						image: "https://peprojects.dev/images/square.jpg",
						description: "lorem",
						favoriteRestaurants: [],
						favoriteItems: [],
					},
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
			.catch((error) => {});
	}

	function clearForm(form) {
		form.email = "";
		form.password = "";
	}
	

	// function saveUser() {
	// 	updateProfile(auth.currentUser, {
	// 		displayName: auth.currentUser.displayName ?? "Display Name",
	// 		photoURL:
	// 			auth.currentUser.photoURL ??
	// 			"https://peprojects.dev/images/square.jpg",
	// 		favoriteRestaurants: profile.favoriteRestaurants,
	// 	})
	// 		.then(() => {
	// 			console.log("profile saved");
	// 		})
	// 		.catch((error) => {
	// 			console.log("error", error);
	// 		});
	// }

	// watch(
	// 	current,
	// 	function () {
	// 		saveUser();
	// 	},
	// 	{ deep: true }
	// );

	return {
		current,
		favoriteRestaurant,
		favoriteItem,
		signUp,
		login,
		logout,
		roles,
		profile,
		id,
	};
});
