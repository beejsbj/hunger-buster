<script setup>
	import { computed, ref } from "vue";

	const user = useUserStore();
	const shop = useShopStore();
	const search = ref("");

	const maxDistance = 15;

	function calculateDistance(userLocation, restaurantLocation) {
		const R = 6371; // Earth's radius in km
		const dLat =
			((restaurantLocation.lat - userLocation.lat) * Math.PI) / 180;
		const dLng =
			((restaurantLocation.lng - userLocation.lng) * Math.PI) / 180;
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((userLocation.lat * Math.PI) / 180) *
				Math.cos((restaurantLocation.lat * Math.PI) / 180) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;
		return distance < maxDistance;
	}

	const locationFiltered = computed(function () {
		if (user?.address?.location) {
			return shop.restaurants.filter(function (restaurant) {
				return calculateDistance(
					user.address.location,
					restaurant.address.location
				);
			});
		}
		return shop.restaurants;
	});

	const filtered = computed(function () {
		if (search.value) {
			return locationFiltered.value.filter(function (restaurant) {
				return restaurant.name.toLowerCase().includes(search.value);
			});
		}
		return locationFiltered.value;
	});

	const noRestaurantsInArea = computed(function () {
		return locationFiltered.value.length === 0;
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

		<div v-if="noRestaurantsInArea">
			<h1 class="attention-voice">There are no restaurants in your area</h1>
			<p>
				Be first to start a
				<RouterLink to="business-signup">Business</RouterLink> in your area!
			</p>
		</div>

		<TransitionGroup
			v-if="!noRestaurantsInArea"
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
				grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			}
		}

		input.search {
			width: 25%;
			transition: 0.2s;

			&:focus {
				width: 100%;
			}
		}
	}
</style>
