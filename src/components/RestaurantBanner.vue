<script setup>
	import { useShopStore } from "../stores/shop";
	import { useUserStore } from "../stores/user";

	const route = useRoute();
	const shop = useShopStore();
	const user = useUserStore();
	const props = defineProps(["restaurant", "cartCount"]);
	const showInfo = ref(false);
</script>


<template>
	<restaurant-banner>
		<text-content>
			<h2 class="loud-voice">
				{{ restaurant.name }}
			</h2>
			<p>
				★
				<span v-if="restaurant.ratings">{{ restaurant.ratings }}</span>
				(<span v-if="restaurant.reviews">{{ restaurant.reviews }}</span
				>+ reviews) · {{ "$".repeat(restaurant.priceLevel) }} ·
				<button
					class="text"
					@click="showInfo = !showInfo"
				>
					More Info
				</button>
			</p>

			<!-- #TODO move to a modal component "more info" -->

			<Teleport to="body">
				<RestaurantInfo
					:restaurant="restaurant"
					:show="showInfo"
					@toggle="showInfo = !showInfo"
				/>
			</Teleport>
		</text-content>
		<picture>
			<img
				:src="
					restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
		</picture>
		<nav class="restaurant-menu">
			<RouterLink :to="'/restaurant/' + restaurant.id">Items</RouterLink>
			<RouterLink
				:to="'/restaurant/' + restaurant.id + '/cart'"
				class="cart"
			>
				Cart
				<span :class="{ cartCount: cartCount }">
					<span>
						{{ cartCount }}
					</span>
				</span>
			</RouterLink>
			<RouterLink
				v-if="user.isAdmin"
				:to="'/restaurant/' + restaurant.id + '/admin'"
				>Administator</RouterLink
			>
			<RouterLink
				v-if="user.isBusiness && user.current.uid == restaurant.owner"
				:to="'/restaurant/' + restaurant.id + '/addItem'"
				>Business Admin</RouterLink
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