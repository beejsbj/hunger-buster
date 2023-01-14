<script setup>
import { ref, reactive } from "vue";
defineProps({
		msg: String,
	});
const self = reactive({
	price: 0,
	quantity: 0,
	items: [],
	output: false,
});

function total() {
	return self.items.reduce(function (total, item) {
		return total + item.total;
	}, 0);
}
function add() {
	if (!self.quantity) self.quantity = 1;
	let item = {
		price: self.price,
		quantity: self.quantity,
		total: self.price * self.quantity,
	};
	console.log( self.price )
	self.items.push(item);
	self.price = "";
	self.quantity = "";
}
function submit() {
	self.output = true;
}
</script>

<template>
	<h1>{{ msg }}</h1>
	<form @submit.prevent="add" id="e4p" autocomplete="off">
		<!-- vue watch this scope -->
		<div class="input-field">
			<label for="price"> Enter Price of item </label>
			<input 
				required 
				type="number" 
				id="price" 
				v-model="price" 
				ref="price" 
			/>
		</div>
		<div class="input-field">
			<label for="quantity"> Enter Quantity of item </label>
			<input 
				type="number" 
				id="quantity" 
				v-model="quantity" 
			/>
		</div>
		<button v-on:submit.prevent="add">Add Item</button>
		<output :class="{ hideOpacity: !self.items[0] }">
			<table class="styled-table">
				<thead>
					<tr>
						<th>Item</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, i) in self.items">
						<td>{{ i + 1 }}</td>
						<td>${{ item.price }}</td>
						<td>{{ item.quantity }}</td>
						<td>${{ item.total }}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td>Total:</td>
						<td>${{ total() }}</td>
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
	grid-template-columns: 0.8fr 1fr 1fr 1fr;
	gap: 5px;
}
tr > * {
	padding: 10px;
}

thead,
tfoot {
	background-color: var(--light-color);
}

tfoot {
	background-color: var(--light-highlight);
}

tbody tr:nth-of-type(even) {
	background-color: var(--paper);
}

.flex-list {
	display: flex;
	gap: 5px;
	margin-bottom: 10px;
}
</style>
