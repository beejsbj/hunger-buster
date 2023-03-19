<script setup>
	const user = useUserStore();
	const shop = useShopStore();

	const search = ref("");

	const filtered = computed(function () {
		if (search.value) {
			return user.restaurants.filter(function (restaurant) {
				return restaurant.name.toLowerCase().includes(search.value);
			});
		}
		return user.restaurants;
	});
</script>

<template>
	<restaurants-module>
		<h1 class="attention-voice">Restaurants</h1>
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

<style scoped>
	restaurants-module {
		display: grid;
		gap: 20px;
	}
</style>
