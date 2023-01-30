<script setup>
	import { useRoute, useRouter } from "vue-router";

	import { useShopStore } from "../stores/shop.js";

	const route = useRoute();
	const shop = useShopStore();

	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});
</script>

<template>
	<header class="restaurant">
		<nav class="restaurant-menu">
			<RouterLink :to="'/restaurant/' + restaurant.slug">Items</RouterLink>
			<RouterLink
				:to="'/restaurant/' + restaurant.slug + '/cart'"
				class="cart"
			>
				Cart
				<span :class="{ cartCount: restaurant.cart.length }">
					{{ restaurant.cart.length }}
				</span>
			</RouterLink>
		</nav>
		<restaurant-banner>
			<h2 class="loud-voice">
				{{ restaurant.name }}
			</h2>
			<picture>
				<img
					:src="
						restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
					"
					alt="https://peprojects.dev/images/square.jpg"
				/>
			</picture>
		</restaurant-banner>
		<h3 class="attention-voice">{{ "$".repeat(restaurant.priceLevel) }}</h3>
	</header>
	<sub-view>
		<RouterView />
	</sub-view>
</template>

<style lang="scss" scoped>
	restaurant-banner {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
	}
	a {
		&.cart {
			position: relative;

			span {
				display: none;
			}

			.cartCount {
				display: initial;
				font-size: 0.8em;
				/*	vertical-align: super;*/
				background: yellow;
				color: black;
				position: absolute;
				top: -10px;
				right: -5px;
			}
		}
	}
</style>
