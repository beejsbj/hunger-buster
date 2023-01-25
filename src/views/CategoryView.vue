<script setup>
import { useShopStore } from "../stores/shop.js";
import { useRoute } from "vue-router";
const route = useRoute();

const shop = useShopStore();
const filtered = shop.list.items.filter(function (item) {
	return item.category.includes(route.params.category);
});
</script>

<template>
	<h2 class="attention-voice">Items</h2>
	<ul>
		<li v-for="item in filtered">
			<item-card>
				<h3 class="solid-voice">
					{{ item.name }}
				</h3>
				<picture>
					<img :src="item.image" alt="" />
				</picture>
				<div>
					<p>${{ item.price }}</p>
					<button @click="shop.add(item)">Add to Cart</button>
					<a :href="'/item/' + item.slug">MORE</a>
				</div>
			</item-card>
		</li>
	</ul>
</template>

<style scoped>
item-card {
	display: grid;
	gap: 5px;
}
item-card div {
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
