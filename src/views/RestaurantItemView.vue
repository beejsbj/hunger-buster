<script setup>
	import { reactive } from "vue";
	import { useRoute } from "vue-router";
	import { useShopStore } from "../stores/shop.js";

	const route = useRoute();
	const shop = useShopStore();

	const restaurant = shop.list.restaurants.find(function (restaurant) {
		return (
			route.params.slug == restaurant.id ||
			route.params.slug == restaurant.slug
		);
	});
	const foundItem = restaurant.menuItems.find(function (item) {
		return (
			route.params.itemSlug == item.id || route.params.itemSlug == item.slug
		);
	});
	const item = reactive(foundItem);
</script>
