<script setup>
import { useShopStore } from "../stores/shop.js";
import { useRoute } from "vue-router";
const route = useRoute();

const shop = useShopStore();
const filtered = shop.list.restaurants.filter(function (restaurant) {
	return restaurant.category.includes(route.params.category);
});
</script>

<template>
	<h2 class="attention-voice">Restaurants</h2>
	<ul>
		<li v-for="restaurant in filtered">
			<restaurant-card>
				<h3 class="solid-voice">
					{{ restaurant.name }}
				</h3>
				<picture>
					<img :src="restaurant.image" alt="" />
				</picture>
				<div>
					<p>${{ restaurant.price }}</p>
					<button @click="shop.add(restaurant)">Add to Cart</button>
					<a :href="'/restaurant/' + restaurant.slug">MORE</a>
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
</style>
