<script setup>
	import { computed, ref } from "vue";
	import { useShopStore } from "../../stores/shop.js";
	import { useUserStore } from "../../stores/user.js";
	import RestaurantCard from "../../components/RestaurantCard.vue";

	const user = useUserStore();
	const shop = useShopStore();
	const filter = ref("");

	const filtered = computed(function () {
		if (filter.value) {
			return shop.restaurants.filter(function (restaurant) {
				return restaurant.name.toLowerCase().includes(filter.value);
			});
		}
		return shop.restaurants;
	});
</script>

<template>
	<article>
		<h1 class="loud-voice">Restaurants</h1>
		<input-field>
			<input
				class="filter"
				type="text"
				v-model="filter"
				placeholder="Filter Restaurants"
			/>
		</input-field>

		<ul class="restaurant-list">
			<li :key="restaurant.id" v-for="restaurant in filtered">
				<RestaurantCard :restaurant="restaurant" />
			</li>
		</ul>
	</article>
</template>

<style scoped>
	article {
		display: grid;
		gap: 20px;
	}
</style>
