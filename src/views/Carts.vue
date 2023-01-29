<script setup>
	import { useShopStore } from "../stores/shop.js";
	import { computed } from "vue";

	// import { useUserStore } from "../stores/user.js";
	// const user = useUserStore();
	const shop = useShopStore();

	function totaler(cart) {
		return cart
			.reduce(function (total, item) {
				return total + item.price * item.quantity;
			}, 0)
			.toFixed(2);
	}
</script>
<template>
	<h2 class="attention-voice">Carts</h2>
	<ul>
		<template v-for="restaurant in shop.restaurants">
			<li v-if="restaurant.cart">
				<restaurant-card>
					<h3 class="solid-voice">
						{{ restaurant.name }}
					</h3>
					<div>
						<picture>
							<img
								:src="
									restaurant.image ??
									'https://peprojects.dev/images/square.jpg'
								"
								alt="https://peprojects.dev/images/square.jpg"
							/>
						</picture>
						<p>Total: ${{ totaler(restaurant.cart) }}</p>
						<p>Cart Size: {{ restaurant.cart.length }}</p>

						<RouterLink
							:to="'/' + restaurant.slug + '/cart'"
							class="cart"
						>
							Go to Cart
						</RouterLink>
					</div>
					<!-- 				<div>
					<p>{{ "$".repeat(restaurant.priceLevel) }}</p>
					<a :href="'/' + restaurant.slug">MORE</a>
					<button
						:class="{
							favorite:
								user.profile.favoriteRestaurants.includes(restaurant),
						}"
						@click="user.favoriteRestaurant(restaurant)"
					>
						Heart
					</button>
				</div> -->
				</restaurant-card>
			</li>
		</template>
	</ul>
</template>
<style scoped>
	restaurant-card div {
		display: grid;
		grid-template-columns: 0.1fr 0.5fr 0.5fr 0.2fr;
	}
	a {
		color: salmon;
	}
</style>
