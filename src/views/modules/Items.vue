<script setup>
	import Item from "./Item.vue";
	import ItemCard from "../../components/ItemCard.vue";
	import { computed, ref } from "vue";

	import { useRoute, useRouter } from "vue-router";

	import { useShopStore } from "../../stores/shop.js";

	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();

	const filter = ref("");

	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});

	// const items = computed(function () {
	// 	return shop.items.find(function (item) {
	// 		return (

	// 		);
	// 	});
	// });

	const filtered = computed(function () {
		return shop.items.filter(function (item) {
			if (filter.value) {
				return (
					item.belongsTo == restaurant.id &&
					item.name.toLowerCase().includes(filter.value)
				);
			}
			return item.belongsTo == restaurant.id;
		});

		return shop.items;
	});
</script>
<template>
	<restaurant-detail>
		<input-field>
			<input
				class="filter"
				type="text"
				v-model="filter"
				placeholder="Filter items"
			/>
		</input-field>
		<menu-items>
			<ul class="items-list">
				<li :key="item.id" v-for="item in filtered">
					<ItemCard :item="item" />
					<Item :item="item" />
				</li>
			</ul>
		</menu-items>
	</restaurant-detail>
</template>
<style lang="scss" scoped>
	restaurant-detail {
		display: grid;
		gap: 20px;
	}
</style>
