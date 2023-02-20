//imports
import { useCurrentUser, useDocument } from "vuefire";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { collection, updateDoc } from "firebase/firestore";

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
		const found = profile.value.favoriteRestaurants.find(function(favorite){
			return favorite.id == restaurant.id
		})
		if (found) {
			let index = profile.value.favoriteRestaurants.indexOf(restaurant);
			profile.value.favoriteRestaurants.splice(index, 1);
		} else {
			profile.value.favoriteRestaurants.push(restaurant);
		}
	}

	function favoriteItem(item) {
		const found = profile.value.favoriteItems.find(function(favorite){
			return favorite.id == item.id
		})
		if (found) {
			let index = profile.value.favoriteItems.indexOf(item);
			profile.value.favoriteItems.splice(index, 1);
		} else {
			profile.value.favoriteItems.push(item);
		}
	}

	function isFavItem(item) {}

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

	watch(
		profile,
		async function (after, before) {
			console.log(id.value);

			const userRef = doc(db, "users", id.value);

			await updateDoc(userRef, {
				profile: after,
			});
		},
		{ deep: true }
	);

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
