<script setup>
	import { useShopStore } from "../stores/shop.js";
	import { useRoute, useRouter } from "vue-router";
	import { computed } from "vue";
	const route = useRoute();
	const router = useRouter();

	const shop = useShopStore();
	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});

	function clearCart() {
		restaurant.cart = [];
	}

	restaurant.cart.map(function (item) {
		let selectionTotal = 0;
		console.log(item.price);
		item.selections.forEach(function (selection) {
			if (selection.price) {
				selectionTotal += selection.price;
			}
		});
		item.totalPrice = item.price + selectionTotal;
	});

	const total = computed(function () {
		return restaurant.cart
			.reduce(function (total, item) {
				return total + item.totalPrice * item.quantity;
			}, 0)
			.toFixed(2);
	});
</script>

<template>
	<article>
		<h3 class="attention-voice">Total: ${{ total }}</h3>

		<table class="styled-table">
			<thead>
				<tr>
					<th>Item</th>
					<th>Name</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Total</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in restaurant.cart">
					<td>
						<picture
							><img
								:src="item.image"
								alt=""
						/></picture>
					</td>
					<td>
						<p>{{ item.name }}</p>
						<ul v-if="item.options">
							<li v-for="selection in item.selections">
								- {{ selection.choice }}
								<span v-if="selection.price"
									>: ${{ selection.price }}+</span
								>
							</li>
						</ul>
						<p
							class="note"
							v-if="item.note"
						>
							{{ item.note }}
						</p>
					</td>
					<td>${{ item.totalPrice }}</td>
					<td>
						<button @click="shop.quantityDecrement(item)">-</button>
						{{ item.quantity }}
						<button @click="shop.quantityIncrement(item)">+</button>
					</td>
					<td>${{ item.totalPrice * item.quantity }}</td>
					<td>
						<button @click="shop.remove(item, restaurant)">Remove</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="buttons">
			<button @click="clearCart()">Clear Cart</button>
		</div>
	</article>
</template>

<style>
	article {
		display: grid;
		gap: 20px;
	}
	table,
	tbody {
		/*		width: 100%;*/
		display: grid;
		gap: 10px;
	}

	tr {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.5fr;
		gap: 15px;
		align-items: center;
		/*		justify-items: center;*/
	}
	tr th {
		display: block;
		padding: 10px;
	}
	td {
		/*		justify-self: stretch;*/
	}

	thead,
	tfoot {
		background-color: hsla(15, 19%, 60%, 1);
	}

	tbody tr:nth-of-type(even) {
		background-color: hsla(209, 39%, 48%, 1);
	}

	.flex-list {
		display: flex;
		gap: 5px;
		margin-bottom: 10px;
	}
	td li {
		font-size: 12px;
	}

	.note {
		font-size: 12px;
	}
</style>
