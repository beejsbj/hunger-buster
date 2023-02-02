<script setup>
	import { computed, ref } from "vue";
	import { useShopStore } from "../stores/shop.js";
	import { useUserStore } from "../stores/user.js";
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
		<h2 class="attention-voice">Restaurants</h2>
		<input-field>
			<input
				class="filter"
				type="text"
				v-model="filter"
				placeholder="Filter Restaurants"
			/>
		</input-field>

		<ul class="restaurant-list">
			<li v-for="restaurant in filtered">
				<restaurant-card>
					<h3 class="solid-voice">
						{{ restaurant.name }}
					</h3>
					<picture>
						<img
							:src="
								restaurant.image ??
								'https://peprojects.dev/images/square.jpg'
							"
							alt="https://peprojects.dev/images/square.jpg"
						/>
					</picture>
					<div>
						<p>{{ "$".repeat(restaurant.priceLevel) }}</p>
						<a :href="'/restaurant/' + restaurant.slug">MORE</a>
						<button
							:class="{
								favorite:
									user.profile.favoriteRestaurants.includes(
										restaurant
									),
							}"
							@click="user.favoriteRestaurant(restaurant)"
						>
							Heart
						</button>
					</div>
				</restaurant-card>
			</li>
		</ul>
	</article>
</template>

<style scoped>
	restaurant-card {
		display: grid;
		gap: 10px;
	}
	restaurant-card div {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
	}
	ul.restaurant-list {
		display: grid;

		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

		gap: 20px;
	}

	article {
		display: grid;
		gap: 20px;
	}
</style>
