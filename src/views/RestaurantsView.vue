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
			<li v-for="restaurant in filtered">
				<restaurant-card>
					<h2 class="attention-voice">
						{{ restaurant.name }}
					</h2>
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
						<a
							class="button outline"
							:href="'/restaurant/' + restaurant.slug"
							>MORE</a
						>
						<button
							:class="{
								favorite:
									user.profile.favoriteRestaurants.includes(
										restaurant
									),
							}"
							@click="user.favoriteRestaurant(restaurant)"
						>
							♡
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
		padding: 10px 0;
		gap: 20px;
	}
	ul.restaurant-list {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

		gap: 20px;
	}

	article {
		display: grid;
		gap: 20px;
	}
</style>
