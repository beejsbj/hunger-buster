<script setup>
import { useShopStore } from "../stores/shop.js";
const shop = useShopStore();
</script>

<template>
	<h3 class="attention-voice">Total: {{ shop.total }}</h3>
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
			<tr v-for="restaurant in shop.list.cart">
				<td>
					<picture><img :src="restaurant.image" alt="" /></picture>
				</td>
				<td>{{ restaurant.name }}</td>
				<td>${{ restaurant.price }}</td>
				<td>
					<button @click="shop.quantityDecrement(restaurant)">-</button>
					{{ restaurant.quantity }}
					<button @click="shop.quantityIncrement(restaurant)">+</button>
				</td>
				<td>${{ restaurant.price * restaurant.quantity }}</td>
				<td>
					<button @click="shop.remove(restaurant)">Remove</button>
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
	align-restaurants: center;
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
</style>
