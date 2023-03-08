import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser, useFirestore } from "vuefire";
import { getDoc, doc } from "firebase/firestore";
////////////////////////
import NotFound from "../views/pages/NotFound.vue";
import About from "../views/pages/About.vue";
import Carts from "../views/pages/Carts.vue";
import Home from "../views/pages/Home.vue";
import User from "../views/pages/UserProfile.vue";
import Business from "../views/pages/Business.vue";
import Restaurants from "../views/pages/Restaurants.vue";
import Restaurant from "../views/pages/Restaurant.vue";
////////////////////////
import Favorites from "../views/modules/Favorites.vue";
import Items from "../views/modules/Items.vue";
import UserAbout from "../views/modules/UserAbout.vue";
import BusinessAbout from "../views/modules/BusinessAbout.vue";
import Cart from "../views/modules/Cart.vue";
import BusinessRestaurants from "../views/modules/BusinessRestaurants.vue";
import AddRestaurant from "../views/modules/AddRestaurant.vue";
import AddItem from "../views/subviews/AddItem/AddItem.vue";
import RestaurantAdmin from "../views/modules/RestaurantAdmin.vue";
import Item from "../views/pages/Item.vue";

import Orders from "../views/modules/Orders.vue";

import UserLogin from "../views/modules/UserLogin.vue";
import UserSignup from "../views/modules/UserSignup.vue";

import BusinessSignup from "../views/modules/BusinessSignup.vue";
import BusinessLogin from "../views/modules/BusinessLogin.vue";

import UserDashboard from "../views/subviews/user/UserDashboard.vue";

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
		},
		{
			path: "/signup",
			name: "userSignup",
			component: UserSignup,
		},
		{
			path: "/business-login",
			name: "businessLogin",
			component: BusinessLogin,
		},
		{
			path: "/business-signup",
			name: "businessSignup",
			component: BusinessSignup,
		},
		{
			path: "/user",
			name: "user",
			component: User,
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
					path: "/user/restaurants",
					name: "BusinessRestaurants",
					component: BusinessRestaurants,
					alias: "/business",
					meta: { requiresBusinessAuth: true },
				},
				{
					path: "/user/addRestaurant",
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
					path: "/restaurant/:restaurantSlug/admin",
					name: "RestaurantAdmin",
					component: RestaurantAdmin,
					meta: {
						transition: "slide-to-right",
						requiresBusinessOwnerAuth: true,
					},
				},
				{
					path: "/restaurant/:restaurantSlug/AddItem",
					name: "AddItem",
					component: AddItem,
					meta: {
						transition: "slide-to-right",
						requiresBusinessOwnerAuth: true,
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
	const currentUser = await getCurrentUser();
	if (to.meta.requiresUserAuth) {
		if (!currentUser) {
			return {
				path: "/login",
				query: {
					redirect: to.fullPath,
				},
			};
		}
	}
	if (to.meta.requiresBusinessAuth) {
		const userDoc = await getDoc(doc(db, "users", currentUser.uid));
		if (
			!currentUser ||
			!userDoc.data().roles.business ||
			!userDoc.data().roles.admin
		) {
			return {
				path: "/business-login",
				query: {
					redirect: to.fullPath,
				},
			};
		}
	}
	if (to.meta.requiresBusinessOwnerAuth) {
		const userDoc = await getDoc(doc(db, "users", currentUser.uid));
		const restaurantDoc = await getDoc(
			doc(db, "restaurants", to.params.restaurantSlug)
		);
		if (
			!currentUser ||
			(!userDoc.data().roles.business &&
				restaurantDoc.data().owner !== currentUser.uid) ||
			!userDoc.data().roles.admin
		) {
			return {
				name: "not-found",
				query: {
					redirect: to.fullPath,
				},
			};
		}
	}
});

export default router;
