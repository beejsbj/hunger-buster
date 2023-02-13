<script setup>
	import { useRoute, useRouter } from "vue-router";
	import { computed, reactive, ref } from "vue";

	import { useShopStore } from "../../stores/shop.js";
	import { useFirestore, useDocument } from "vuefire";
	import { collection, query, where, doc, limit } from "firebase/firestore";
	import { update } from "@firebase/database";
	const db = useFirestore();

	const route = useRoute();
	const shop = useShopStore();

	const restaurantRef = collection(db, "restaurants");
	const queried = query(
		restaurantRef,
		where("slug", "==", route.params.restaurantSlug)
	);

	const restaurant = useDocument(queried);

	//
	//
	//
	const cartSize = reactive({
		value: 0,
	});
	//
	//
	//
</script>

<template>
	<article v-if="restaurant">
		<header class="restaurant">
			<restaurant-banner>
				<text-content>
					<h2 class="loud-voice">
						{{ restaurant[0].name }}
					</h2>
					<h3 class="firm-voice">
						{{ "$".repeat(restaurant[0].priceLevel) }}
					</h3>
				</text-content>
				<picture>
					<img
						:src="
							restaurant[0].image ??
							'https://peprojects.dev/images/square.jpg'
						"
						alt="https://peprojects.dev/images/square.jpg"
					/>
				</picture>
				<nav class="restaurant-menu">
					<RouterLink :to="'/restaurant/' + restaurant[0].slug"
						>Items</RouterLink
					>
					<RouterLink
						:to="'/restaurant/' + restaurant[0].slug + '/cart'"
						class="cart"
					>
						Cart
						<span :class="{ cartCount: cartSize.value }">
							<span>
								{{ cartSize.value }}
							</span>
						</span>
					</RouterLink>
				</nav>
			</restaurant-banner>
		</header>
		<sub-view>
			<RouterView :restaurant="restaurant[0]" :cartSize="cartSize" />
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
