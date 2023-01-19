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
			<tr v-for="item in shop.list.cart">
				<td>
					<picture><img :src="item.image" alt="" /></picture>
				</td>
				<td>{{ item.name }}</td>
				<td>${{ item.price }}</td>
				<td>
					<button @click="shop.quantityDecrement(item)">-</button>
					{{ item.quantity }}
					<button @click="shop.quantityIncrement(item)">+</button>
				</td>
				<td>${{ item.price * item.quantity }}</td>
				<td>
					<button @click="shop.remove(item)">Remove</button>
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
</style>
