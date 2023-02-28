<script setup>
import { useShopStore } from "../stores/shop";
import { useUserStore } from "../stores/user";

	const route = useRoute();
	const shop = useShopStore();
	const user = useUserStore();
	const props = defineProps(["restaurant", "cartSize"]);
</script>


<template>
	<restaurant-banner>
		<text-content>
			<h2 class="loud-voice">
				{{ props.restaurant.name }}
			</h2>
			<h3 class="firm-voice">
				{{ "$".repeat(props.restaurant.priceLevel) }}
			</h3>
		</text-content>
		<picture>
			<img
				:src="
					props.restaurant.image ??
					'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
		</picture>
		<nav class="restaurant-menu">
			<RouterLink :to="'/restaurant/' + props.restaurant.slug"
				>Items</RouterLink
			>
			<RouterLink
				:to="'/restaurant/' + props.restaurant.slug + '/cart'"
				class="cart"
			>
				Cart
				<span :class="{ cartCount: cartSize }">
					<span>
						{{ cartSize }}
					</span>
				</span>
			</RouterLink>
			<RouterLink v-if="user.isAdmin" :to="'/restaurant/' + props.restaurant.slug + '/admin'"
				>Administator</RouterLink
			>
		</nav>
	</restaurant-banner>
</template>

<style lang="scss" scoped>
	restaurant-banner {
		display: grid;
		grid-template-columns: 1fr 0.2fr;
		picture {
			grid-row: span 2;
		}
		nav {
			align-content: start;
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