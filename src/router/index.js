import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProfileView from "../views/ProfileView.vue";
import Favorites from "../components/Favorites.vue";
import UserAbout from "../components/UserAbout.vue";
import RestaurantsView from "../views/RestaurantsView.vue";
import Carts from "../views/Carts.vue";
import CategoryView from "../views/CategoryView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import Items from "../components/Items.vue";
import Cart from "../views/Cart.vue";
import RestaurantItemView from "../views/RestaurantItemView.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: AboutView,
		},
		{
			path: "/user",
			name: "user",
			component: ProfileView,
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
			component: RestaurantsView,
		},
		{
			path: "/carts",
			name: "carts",
			component: Carts,
		},
		{
			path: "/restaurants/:category",
			name: "RestaurantsCategory",
			component: CategoryView,
		},
		{
			path: "/restaurant/:restaurantSlug",
			name: "Restaurant",
			component: RestaurantView,
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
					component: RestaurantItemView,
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
