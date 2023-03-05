import { createRouter, createWebHistory } from "vue-router";
////////////////////////
import NotFound from "../views/pages/NotFound.vue";
import About from "../views/pages/About.vue";
import Carts from "../views/pages/Carts.vue";
import Home from "../views/pages/Home.vue";
import User from "../views/pages/User.vue";
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
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: About,
		},
		{
			path: "/login",
			name: "login",
			component: User,
		},
		{
			path: "/user",
			name: "user",
			component: User,
			children: [
				{
					path: "favorites",
					name: "userFavorites",
					component: Favorites,
				},
				{
					path: "orders",
					name: "userOrders",
					component: Orders,
				},
				{
					path: "about",
					name: "UserAbout",
					component: UserAbout,
				},
				{
					path: "restaurants",
					name: "BusinessRestaurants",
					component: BusinessRestaurants,
				},
				{
					path: "addRestaurant",
					name: "addRestaurant",
					component: AddRestaurant,
				},
			],
		},
		{
			path: "/business",
			name: "business",
			component: Business,
			children: [
				{
					path: "/business/about",
					name: "BusinessAbout",
					component: BusinessAbout,
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
					path: "/restaurant/:restaurantSlug/:itemSlug",
					name: "RestaurantItem",
					component: Item,
				},
				{
					path: "/restaurant/:restaurantSlug",
					name: "Items",
					component: Items,
					meta: { transition: "slide-to-left" },
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
					meta: { transition: "slide-to-right" },
				},
				{
					path: "/restaurant/:restaurantSlug/AddItem",
					name: "AddItem",
					component: AddItem,
					meta: { transition: "slide-to-right" },
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

export default router;
