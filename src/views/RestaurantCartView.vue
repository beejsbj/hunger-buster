<script setup>
	import { useShopStore } from "../stores/shop.js";
	import { useRoute, useRouter } from "vue-router";
	const route = useRoute();
	const router = useRouter();

	const shop = useShopStore();
	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});

	function redirect() {
		router.push({
			path: `${route.params.restaurantSlug}/cart`,
		});
	}

	restaurant.cart.map(function (item) {
		let selectionTotal = 0;
		for (const option in item.selections) {
			selectionTotal += item.selections[option][1];
		}
		item.price += selectionTotal;
	});
</script>

<template>
	<h3 class="attention-voice">Total: {{}}</h3>
	<pre>
		<code>
			{{ restaurant.cart }}
		</code>
	</pre>
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
							- {{ selection[0] }}: ${{ selection[1] }}+
						</li>
					</ul>
				</td>
				<td>${{ item.price }}</td>
				<td>
					<!-- <button @click="shop.quantityDecrement(item)">-</button> -->
					{{ item.quantity }}
					<!-- <button @click="shop.quantityIncrement(item)">+</button> -->
				</td>
				<td>${{ item.price * item.quantity }}</td>
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
