<script setup>
	import Item from "./Item.vue";
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
	<restaurant-card>
		<input-field>
			<input
				class="filter"
				type="text"
				v-model="filter"
				placeholder="Filter items"
			/>
		</input-field>
		<menu-items>
			<ul>
				<li v-for="item in filtered">
					<item-card>
						<picture>
							<img
								:src="
									item.image ??
									'https://peprojects.dev/images/square.jpg'
								"
								alt="https://peprojects.dev/images/square.jpg"
							/>
						</picture>
						<h4 class="solid-voice">{{ item.name }}</h4>

						<div>
							<p>${{ item.price }}</p>
							<!-- <RouterLink
							:to="`/restaurant/${restaurant.slug}/${item.slug}`"
							>MORE</RouterLink
						> -->

							<button @click="item.show = !item.show">MORE</button>
						</div>
					</item-card>
					<Item :item="item" />
				</li>
			</ul>
		</menu-items>
	</restaurant-card>
</template>
<style lang="scss" scoped>
	restaurant-card,
	menu-items ul {
		display: grid;
		gap: 20px;
	}

	menu-items ul {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
	item-card div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 0;
	}

	item-card {
		display: grid;
		gap: 10px;
	}
	item-card picture img {
		aspect-ratio: 1 / 1;
		object-fit: cover;
	}
	a {
		color: var(--highlight);
	}
</style>
