<script setup>
	import { useShopStore } from "../stores/shop.js";
	import { useUserStore } from "../stores/user.js";
	const user = useUserStore();
	const shop = useShopStore();
</script>

<template>
	<h2 class="attention-voice">Restaurants</h2>
	<ul>
		<li v-for="restaurant in shop.restaurants">
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
								user.profile.favoriteRestaurants.includes(restaurant),
						}"
						@click="user.favoriteRestaurant(restaurant)"
					>
						Heart
					</button>
				</div>
			</restaurant-card>
		</li>
	</ul>
</template>

<style scoped>
	restaurant-card {
		display: grid;
		gap: 5px;
	}
	restaurant-card div {
		display: flex;
		justify-content: space-between;
	}
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

		gap: 10px;
	}

	button.favorite {
		background: yellow;
	}
</style>
