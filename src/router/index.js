import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser, useFirestore } from "vuefire";
import { getDoc, doc } from "firebase/firestore";
////////////////////////
import NotFound from "@/views/pages/NotFound.vue";
import About from "@/views/pages/About.vue";
import Carts from "@/views/pages/Carts.vue";
import Home from "@/views/pages/Home.vue";
import ContactView from "@/views/pages/ContactView.vue";
import FAQView from "@/views/pages/FAQView.vue";
import TermsView from "@/views/pages/TermsView.vue";
import PrivacyView from "@/views/pages/PrivacyView.vue";
import SupportView from "@/views/pages/SupportView.vue";
import FeedbackView from "@/views/pages/FeedbackView.vue";

import UserLogin from "@/views/pages/UserLogin.vue";
import UserSignup from "@/views/pages/UserSignup.vue";
import BusinessSignup from "@/views/pages/BusinessSignup.vue";
import BusinessLogin from "@/views/pages/BusinessLogin.vue";

//User
import UserView from "@/views/pages/UserView/UserView.vue";
import UserDashboard from "@/views/pages/UserView/subviews/UserDashboard.vue";
import UserFavorites from "@/views/pages/UserView/subviews/UserFavorites.vue";
import UserAbout from "@/views/pages/UserView/subviews/UserAbout.vue";
import UserOrders from "@/views/pages/UserView/subviews/UserOrders.vue";
import UserProfileEdit from "@/views/pages/UserView/subviews/UserProfileEdit.vue";

//Business
import BusinessView from "@/views/pages/BusinessView/BusinessView.vue";
import BusinessAbout from "@/views/pages/BusinessView/subviews/BusinessAbout.vue";
import BusinessRestaurants from "@/views/pages/BusinessView/subviews/BusinessRestaurants.vue";
import AddRestaurant from "@/views/pages/BusinessView/subviews/AddRestaurant.vue";

//Restaurant
import Restaurants from "@/views/pages/Restaurants.vue";
import RestaurantView from "@/views/pages/RestaurantView/RestaurantView.vue";
import RestaurantItems from "@/views/pages/RestaurantView/subviews/RestaurantItems.vue";
import RestaurantItem from "@/views/pages/RestaurantView/subviews/RestaurantItem.vue";

import RestaurantCart from "@/views/pages/RestaurantView/subviews/RestaurantCart.vue";
import RestaurantCheckout from "@/views/pages/RestaurantView/subviews/RestaurantCheckout.vue";

import CreateItem from "@/views/pages/RestaurantView/subviews/CreateItem/CreateItem.vue";
import RestaurantAdmin from "@/views/pages/RestaurantView/subviews/RestaurantAdmin.vue";

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
			path: "/contact",
			name: "contact",
			component: ContactView,
		},
		{
			path: "/faq",
			name: "faq",
			component: FAQView,
		},
		{
			path: "/terms",
			name: "terms",
			component: TermsView,
		},
		{
			path: "/privacy",
			name: "privacy",
			component: PrivacyView,
		},
		{
			path: "/support",
			name: "support",
			component: SupportView,
		},
		{
			path: "/feedback",
			name: "feedback",
			component: FeedbackView,
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
			component: UserView,
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
					component: UserFavorites,
				},
				{
					path: "/user/orders",
					name: "userOrders",
					component: UserOrders,
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
			component: BusinessView,
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
				{
					path: "/business/about",
					name: "BusinessAbout",
					component: BusinessAbout,
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
			component: RestaurantView,
			children: [
				{
					path: "/restaurant/:restaurantSlug",
					name: "RestaurantItems",
					component: RestaurantItems,
					meta: { transition: "slide-to-left" },
				},
				{
					path: "/restaurant/:restaurantSlug/:itemSlug",
					name: "RestaurantItem",
					component: RestaurantItem,
				},
				{
					path: "/restaurant/:restaurantSlug/cart",
					name: "RestaurantCart",
					component: RestaurantCart,
					meta: { transition: "slide-to-right" },
				},
				{
					path: "/restaurant/:restaurantSlug/checkout",
					name: "RestaurantRestaurantCheckout",
					component: RestaurantCheckout,
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
