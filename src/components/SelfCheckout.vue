<script setup>
import { ref, reactive } from "vue";
import { useCartStore } from "../stores/cart.js";

const item = reactive({
		name: "",
		price: 0,
		quantity: 0,
	});

const cart = useCartStore();
console.log(cart.items);
</script>

<template>
	<h1>Self Checkout</h1>
	<form @submit.prevent="cart.add(item)" id="e4p" autocomplete="off">
		<div class="input-field">
			<label for="name"> Enter Name of item </label>
			<input
				required
				type="text"
				id="name"
				v-model="item.name"
			/>
		</div>
		<div class="input-field">
			<label for="price"> Enter Price of item </label>
			<input
				required
				type="number"
				id="price"
				v-model="item.price"
				ref="price"
			/>
		</div>
		<div class="input-field">
			<label for="quantity"> Enter Quantity of item </label>
			<input 
				type="number" 
				id="quantity" 
				v-model="item.quantity" 
			/>
		</div>

		<button>Add Item</button>
		<output>
			<table class="styled-table">
				<thead>
					<tr>
						<th>Item</th>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, i) in cart.items">
						<td>{{ i + 1 }}</td>
						<td>{{ item.name }}</td>
						<td>${{ item.price }}</td>
						<td>{{ item.quantity }}</td>
						<td>${{ item.total }}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td>Total:</td>
						<td>${{ cart.total }}</td>
					</tr>
				</tfoot>
			</table>
		</output>
	</form>
</template>

<style scoped>
.hide {
	opacity: 0;
}
output {
	border: solid 1px hsla(153, 47%, 53%, 1);
	padding: 20px;
	text-align: left;
}
output span {
	color: hsla(153, 47%, 53%, 1);
}
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	padding: 50px;
}

a,
button {
	color: hsla(153, 47%, 53%, 1);
}

button {
	background: none;
	border: solid 1px;
	border-radius: 2em;
	font: inherit;
	padding: 0.75em 2em;
	cursor: pointer;
}
input {
	padding: 10px;
}
form {
	display: grid;
	max-width: 400px;
	gap: 20px;
	margin: 0 auto;
}
.input-field {
	display: grid;
	gap: 10px;
}

table {
	width: 100%;
}

tr {
	display: grid;
	grid-template-columns: 0.8fr 1fr 1fr 1fr 1fr;
	gap: 5px;
}
tr > * {
	padding: 10px;
}

thead,
tfoot {
	background-color: hsla(159, 19%, 60%, 1);
}

tbody tr:nth-of-type(even) {
	background-color: hsla(159, 59%, 87%, 1);
}

.flex-list {
	display: flex;
	gap: 5px;
	margin-bottom: 10px;
}
</style>
