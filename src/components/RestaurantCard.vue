<script setup>
	import { useUserStore } from "../stores/user.js";
	const user = useUserStore();

	const props = defineProps(["restaurant"]);
	const restaurant = props.restaurant;

	console.log(restaurant);
</script>


<template>
	<restaurant-card>
		<picture>
			<img
				:src="
					restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
		</picture>
		<text-content>
			<h2 class="solid-voice">
				{{ restaurant.name }}
			</h2>
			<p class="price-level">{{ "$".repeat(restaurant.priceLevel) }}</p>
		</text-content>
		<div>
			<a class="button outline" :href="'/restaurant/' + restaurant.slug"
				>MORE</a
			>
			<button
				:class="{
					favorite: user.profile.favoriteRestaurants.includes(restaurant),
				}"
				@click="user.favoriteRestaurant(restaurant)"
			>
				♡
			</button>
		</div>
	</restaurant-card>
</template>

<style scoped>
	restaurant-card {
		display: grid;
		gap: 10px;
		background-color: rgba(0, 0, 0, 0.1);
	}
	restaurant-card div {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	text-content {
		display: flex;
		justify-content: space-between;
	}

	.price-level {
		color: yellowgreen;
	}
</style>