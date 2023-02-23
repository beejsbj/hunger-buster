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
///////////////////////////////////////////////////////

//setup
const router = useRouter();
const db = useFirestore();

///////////////////////////////////////////////////////
function useUser() {
	const current = useCurrentUser();

	const userRef = computed(function () {
		if (current.value?.uid) {
			return doc(collection(db, "users"), `user_${current.value.uid}`);
		}
	});
	const userDoc = useDocument(userRef);

	//compute returns
	const id = computed(() => userDoc.value?.id);
	const profile = computed(() => userDoc.value?.profile);
	const isAdmin = computed(() => userDoc.value?.roles.admin);

	return { id, profile, isAdmin };
}
///////////////////////////////////////////////////////

// /store
export const useUserStore = defineStore("user", () => {
	///////////////////////////////////////////////////////
	const auth = getAuth();
	const current = useCurrentUser();
	const { id, profile, isAdmin } = useUser();

	///////////////////////////////////////////////////////
	// functions
	function favoriteRestaurant(restaurant) {
		const found = profile.value.favoriteRestaurants.find(function (favorite) {
			return favorite.id == restaurant.id;
		});
		if (found) {
			let index = profile.value.favoriteRestaurants.indexOf(restaurant);
			profile.value.favoriteRestaurants.splice(index, 1);
		} else {
			profile.value.favoriteRestaurants.push(restaurant);
		}
	}

	function favoriteItem(item) {
		const found = profile.value.favoriteItems.find(function (favorite) {
			return favorite.id == item.id;
		});
		if (found) {
			let index = profile.value.favoriteItems.indexOf(item);
			profile.value.favoriteItems.splice(index, 1);
		} else {
			profile.value.favoriteItems.push(item);
		}
	}

	function isFavItem(item) {}

	/// authorization ///
	function signUp(form) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const user = userCredential.user;
				setDoc(doc(db, "users", `user_${user.uid}`), {
					id: user.uid,
					isAdmin: {},
					profile: {
						displayName: form.displayName ?? "Display Name",
						image: "https://peprojects.dev/images/square.jpg",
						description:
							"Lorem, this is the profile description, edit it to your liking, thuugh that feature might not exist yet tehe. Ipsum",
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
		favoriteRestaurant,
		favoriteItem,
		signUp,
		login,
		logout,
		isAdmin,
		profile,
		id,
	};
});
