<script setup>
	import { computed, ref } from "vue";

	const user = useUserStore();
	const shop = useShopStore();
	const search = ref("");

	const filtered = computed(function () {
		if (search.value) {
			return shop.restaurants.filter(function (restaurant) {
				return restaurant.name.toLowerCase().includes(search.value);
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
				class="search"
				type="text"
				v-model="search"
				placeholder="Search Restaurants"
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
