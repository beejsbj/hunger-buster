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
	<article>
		<header class="restaurant">
			<nav class="restaurant-menu">
				<RouterLink :to="'/restaurant/' + restaurant.slug"
					>Items</RouterLink
				>
				<RouterLink
					:to="'/restaurant/' + restaurant.slug + '/cart'"
					class="cart"
				>
					Cart
					<span :class="{ cartCount: restaurant.cart.length }">
						<span>
							{{ restaurant.cart.length }}
						</span>
					</span>
				</RouterLink>
			</nav>
			<restaurant-banner>
				<text-content>
					<h2 class="loud-voice">
						{{ restaurant.name }}
					</h2>
					<h3 class="firm-voice">
						{{ "$".repeat(restaurant.priceLevel) }}
					</h3>
				</text-content>
				<picture>
					<img
						:src="
							restaurant.image ??
							'https://peprojects.dev/images/square.jpg'
						"
						alt="https://peprojects.dev/images/square.jpg"
					/>
				</picture>
			</restaurant-banner>
		</header>
		<sub-view>
			<RouterView />
		</sub-view>
	</article>
</template>

<style lang="scss" scoped>
	header,
	article {
		display: grid;
		gap: 20px;
	}
	restaurant-banner {
		display: grid;
		grid-template-columns: 1fr 0.2fr;
		picture {
			grid-row: span 2;
		}
	}
	a {
		&.cart {
			position: relative;

			span {
				display: none;
			}

			.cartCount {
				display: initial;
				/*	vertical-align: super;*/
				background: yellow;
				color: black;
				position: absolute;
				top: -10px;
				right: -5px;
				padding: 10px;
				border-radius: 50%;

				span {
					font-size: 0.9em;
					display: initial;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
</style>
