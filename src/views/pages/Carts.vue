<script setup>
	import { useShopStore } from "../../stores/shop.js";
	import { computed } from "vue";

	// import { useUserStore } from "../stores/user.js";
	// const user = useUserStore();
	const shop = useShopStore();

	function totaler(cart) {
		return cart
			.reduce(function (total, item) {
				return total + item.totalPrice * item.quantity;
			}, 0)
			.toFixed(2);
	}
</script>
<template>
	<article>
		<h1 class="loud-voice">Carts</h1>
		<ul>
			<template v-for="restaurant in shop.restaurants">
				<li :key="restaurant.id" v-if="restaurant.cart">
					<restaurant-card>
						<h2 class="solid-voice">
							{{ restaurant.name }}
						</h2>
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
								:to="'/restaurant/' + restaurant.slug + '/cart'"
								class="cart button"
							>
								Go to Cart
							</RouterLink>
						</div>
					</restaurant-card>
				</li>
			</template>
		</ul>
	</article>
</template>
<style scoped>
	restaurant-card,
	article {
		display: grid;
		gap: 15px;
	}
	restaurant-card div {
		display: grid;
		grid-template-columns: 0.1fr 0.5fr 0.5fr 0.2fr;
		align-items: center;
		justify-items: center;
	}
	ul {
		display: grid;
		gap: 20px;
	}

	.button {
		text-align: center;
	}
</style>
