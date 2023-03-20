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
	<restaurants-module>
		<h1 class="loud-voice">Restaurants</h1>
		<input-field>
			<input
				class="search"
				type="text"
				v-model="search"
				placeholder="Search Restaurants"
			/>
		</input-field>

		<TransitionGroup
			name="list"
			tag="ul"
			class="restaurant-list"
		>
			<li
				:key="restaurant.id"
				v-for="restaurant in filtered"
			>
				<RestaurantCard :restaurant="restaurant" />
			</li>
		</TransitionGroup>
	</restaurants-module>
</template>

<style lang="scss" scoped>
	restaurants-module {
		display: grid;
		gap: 20px;

		ul.restaurant-list {
			display: grid;

			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

			gap: 30px;

			@media (min-width: 450px) {
				grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
			}
		}
	}
</style>
