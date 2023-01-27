import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/restaurants",
			name: "Restaurants",
			component: () => import("../views/RestaurantsView.vue"),
		},
		{
			path: "/restaurants/:category",
			name: "RestaurantsCategory",
			component: () => import("../views/CategoryView.vue"),
		},
		{
			path: "/:restaurantSlug",
			name: "Restaurant",
			component: () => import("../views/RestaurantView.vue"),
		},
		{
			path: "/:restaurantSlug/cart",
			name: "RestaurantCart",
			component: () => import("../views/RestaurantCartView.vue"),
		},
		{
			path: "/:restaurantSlug/:itemSlug",
			name: "RestaurantItem",
			component: () => import("../views/RestaurantItemView.vue"),
		},
	],
});

export default router;
