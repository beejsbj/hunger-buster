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
					{{ item.name }}
					<ul v-if="item.options">
						<li v-for="selection in item.selections">
							- {{ selection.choice }}
							<span v-if="selection.price"
								>: ${{ selection.price }}+</span
							>
						</li>
					</ul>
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
</template>

<style>
	table {
		width: 100%;
	}

	tr {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.5fr;
		gap: 5px;
		align-items: center;
	}
	/*tr > * {
		padding: 10px;
}*/

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
</style>
