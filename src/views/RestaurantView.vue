<script setup>
	import { useRoute, useRouter } from "vue-router";

	import { useShopStore } from "../stores/shop.js";

	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();

	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});
</script>

<template>
	<restaurant-card>
		<h2 class="loud-voice">
			{{ restaurant.name }}
		</h2>
		<h3 class="attention-voice">{{ "$".repeat(restaurant.priceLevel) }}</h3>
		<a href="/"></a>
		<picture>
			<img
				:src="
					restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
		</picture>
		<menu-items>
			<ul>
				<li v-for="item in restaurant.menuItems">
					<item-card>
						<h4>{{ item.name }}</h4>
						<picture>
							<img
								:src="
									item.image ??
									'https://peprojects.dev/images/square.jpg'
								"
								alt="https://peprojects.dev/images/square.jpg"
							/>
						</picture>

						<p>${{ item.price }}</p>
						<a :href="`${restaurant.slug}/${item.slug}`">MORE</a>
					</item-card>
				</li>
			</ul>
		</menu-items>
	</restaurant-card>
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

	item-card {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
	}

	a {
		color: salmon;
	}
</style>
