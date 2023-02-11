import { createRouter, createWebHistory } from "vue-router";
import Favorites from "../components/Favorites.vue";
import Items from "../views/modules/Items.vue";
import UserAbout from "../views/modules/UserAbout.vue";
import Cart from "../views/modules/Cart.vue";
import Category from "../views/Category.vue";
import Item from "../views/modules/Item.vue";
import NotFound from "../views/pages/NotFound.vue";
import About from "../views/pages/About.vue";
import Carts from "../views/pages/Carts.vue";
import Home from "../views/pages/Home.vue";
import User from "../views/pages/User.vue";
import Restaurants from "../views/pages/Restaurants.vue";
import Restaurant from "../views/pages/Restaurant.vue";

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
			path: "/user",
			name: "user",
			component: User,
			children: [
				{
					path: "/user/favorites",
					name: "userFavorites",
					component: Favorites,
				},
				{
					path: "/user/about",
					name: "UserAbout",
					component: UserAbout,
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
			path: "/restaurants/:category",
			name: "RestaurantsCategory",
			component: Category,
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
				},
				{
					path: "/restaurant/:restaurantSlug/cart",
					name: "RestaurantCart",
					component: Cart,
				},
				{
					path: "/restaurant/:restaurantSlug/:itemSlug",
					name: "RestaurantItem",
					component: Item,
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
