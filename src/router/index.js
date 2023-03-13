import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser, useFirestore } from "vuefire";
import { getDoc, doc } from "firebase/firestore";
////////////////////////
import NotFound from "../views/pages/NotFound.vue";
import About from "../views/pages/About.vue";
import Carts from "../views/pages/Carts.vue";
import Home from "../views/pages/Home.vue";
import UserProfile from "../views/pages/UserProfile.vue";
import UserProfileEdit from "../views/pages/User/UserProfileEdit.vue";
import BusinessProfile from "../views/pages/BusinessProfile.vue";
import Restaurants from "../views/pages/Restaurants.vue";
import Restaurant from "../views/pages/Restaurant.vue";
////////////////////////
import Favorites from "../views/modules/Favorites.vue";
import Items from "../views/modules/Items.vue";
import CheckoutPage from "../views/pages/CheckoutPage.vue";
import UserAbout from "../views/modules/UserAbout.vue";

import BusinessAbout from "../views/modules/BusinessAbout.vue";
import Cart from "../views/modules/Cart.vue";
import BusinessRestaurants from "../views/modules/BusinessRestaurants.vue";
import AddRestaurant from "../views/modules/AddRestaurant.vue";
import CreateItem from "../views/subviews/CreateItem/CreateItem.vue";
import RestaurantAdmin from "../views/modules/RestaurantAdmin.vue";
import Item from "../views/pages/Item.vue";

import Orders from "../views/modules/Orders.vue";

import UserLogin from "../views/modules/UserLogin.vue";
import UserSignup from "../views/modules/UserSignup.vue";

import BusinessSignup from "../views/modules/BusinessSignup.vue";
import BusinessLogin from "../views/modules/BusinessLogin.vue";

import UserDashboard from "../views/pages/User/UserDashboard.vue";

const db = useFirestore();

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/about",
			name: "about",
			component: About,
		},
		{
			path: "/login",
			name: "userLogin",
			component: UserLogin,
			meta: { requiresGuest: true },
		},
		{
			path: "/signup",
			name: "userSignup",
			component: UserSignup,
			meta: { requiresGuest: true },
		},
		{
			path: "/business-login",
			name: "businessLogin",
			component: BusinessLogin,
			meta: { requiresGuest: true },
		},
		{
			path: "/business-signup",
			name: "businessSignup",
			component: BusinessSignup,
			meta: { requiresGuest: true },
		},
		{
			path: "/user",
			name: "user",
			component: UserProfile,
			meta: { requiresUserAuth: true },
			children: [
				{
					path: "/user/dashboard",
					name: "UserDashboard",
					component: UserDashboard,
					alias: "/user",
				},
				{
					path: "/user/about",
					name: "UserAbout",
					component: UserAbout,
				},
				{
					path: "/user/favorites",
					name: "userFavorites",
					component: Favorites,
				},
				{
					path: "/user/orders",
					name: "userOrders",
					component: Orders,
				},
				{
					path: "/user/edit",
					name: "userEdit",
					component: UserProfileEdit,
				},
			],
		},
		{
			path: "/business",
			name: "business",
			component: BusinessProfile,
			meta: { requiresBusinessAuth: true },
			children: [
				{
					path: "/business/restaurants",
					name: "BusinessRestaurants",
					component: BusinessRestaurants,
					alias: "/business",
					meta: { requiresBusinessAuth: true },
				},
				{
					path: "/business/addRestaurant",
					name: "addRestaurant",
					component: AddRestaurant,
					alias: "/business/add-restaurant",
					meta: { requiresBusinessAuth: true },
				},
			],
		},

		{
			path: "/restaurants",
			name: "Restaurants",
			component: Restaurants,
		},
		{
			path: "/carts",
			name: "carts",
			component: Carts,
			meta: { requiresUserAuth: true },
		},
		{
			path: "/restaurant/:restaurantSlug",
			name: "Restaurant",
			component: Restaurant,
			children: [
				{
					path: "/restaurant/:restaurantSlug",
					name: "Items",
					component: Items,
					meta: { transition: "slide-to-left" },
				},
				{
					path: "/restaurant/:restaurantSlug/:itemSlug",
					name: "RestaurantItem",
					component: Item,
				},
				{
					path: "/restaurant/:restaurantSlug/cart",
					name: "RestaurantCart",
					component: Cart,
					meta: { transition: "slide-to-right" },
				},
				{
					path: "/restaurant/:restaurantSlug/checkout",
					name: "RestaurantCheckoutPage",
					component: CheckoutPage,
				},
				{
					path: "/restaurant/:restaurantSlug/admin",
					name: "RestaurantAdmin",
					component: RestaurantAdmin,
					meta: {
						transition: "slide-to-right",
						requiresBusinessOwnerAuth: true,
						requiresUserAuth: true,
					},
				},
				{
					path: "/restaurant/:restaurantSlug/CreateItem",
					name: "CreateItem",
					component: CreateItem,
					meta: {
						transition: "slide-to-right",
						requiresBusinessOwnerAuth: true,
						requiresUserAuth: true,
					},
				},
			],
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: NotFound,
		},
	],
});

router.beforeEach(async (to) => {
	const ui = useInterfaceStore();
	const currentUser = await getCurrentUser();

	if (to.meta.requiresUserAuth && !currentUser) {
		ui.notify(`Please login to see ${to.fullPath} page!`);

		return {
			path: "/login",
			query: {
				redirect: to.fullPath,
			},
		};
	}

	if (to.meta.requiresGuest && currentUser) {
		ui.notify(`You are already logged in!`);
		return {
			path: "/user",
			query: {
				redirect: to.fullPath,
			},
		};
	}

	if (to.meta.requiresBusinessAuth) {
		if (!currentUser) {
			ui.notify(`Login to a business account for ${to.fullPath}`);
			return {
				path: "/business-login",
				query: {
					redirect: to.fullPath,
				},
			};
		}

		const userDoc = await getDoc(doc(db, "users", currentUser.uid));

		if (!userDoc.data().roles.business && !userDoc.data().roles.admin) {
			ui.notify(`You need a business account for ${to.fullPath}`);
			return {
				path: "/business-login",
				query: {
					redirect: to.fullPath,
				},
			};
		}
	}
	if (to.meta.requiresBusinessOwnerAuth) {
		if (!currentUser) {
			ui.notify(`Login to a business account for ${to.fullPath}`);
			return {
				path: "/business-login",
				query: {
					redirect: to.fullPath,
				},
			};
		}

		const userDoc = await getDoc(doc(db, "users", currentUser.uid));
		const restaurantDoc = await getDoc(
			doc(db, "restaurants", to.params.restaurantSlug)
		);

		if (
			restaurantDoc.data().owner !== currentUser.uid &&
			!userDoc.data().roles.admin
		) {
			ui.notify(`You are not the owner of ${restaurantDoc.data().name}`);

			return {
				name: "home",
				query: {
					redirect: to.fullPath,
				},
			};
		}
	}
});

//////

export default router;
