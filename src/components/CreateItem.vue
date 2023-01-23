<script setup>
import { reactive } from "vue";
import { useShopStore } from "../stores/shop.js";
import { useRouter } from "vue-router";

const router = useRouter();

const shop = useShopStore();

const item = reactive({
	name: "",
	price: "",
	image: "",
});

function redirect() {
	// get slug of recently added item
	let slug = shop.list.items[shop.list.items.length - 1].slug;
	router.push({ path: `item/${slug}` });
}
</script>

<template>
	<h1>Add a New item to store</h1>
	<form
		@submit.prevent="
			shop.create(item);
			redirect();
		"
		autocomplete="off"
	>
		<div class="input-field">
			<label for="name"> Enter Name of item </label>
			<input
				placeholder="Carrots"
				required
				type="text"
				id="name"
				v-model="item.name"
				ref="name"
			/>
		</div>
		<div class="input-field">
			<label for="price"> Enter Price of item </label>
			<input
				placeholder="1.3"
				required
				type="number"
				id="price"
				v-model="item.price"
				ref="price"
				step="0.01"
			/>
		</div>
		<div class="input-field">
			<label for="image"> Enter Image of item </label>
			<input
				placeholder="optional Image url"
				type="text"
				id="image"
				v-model="item.image"
			/>
		</div>

		<button>Add Item</button>
		<output> </output>
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
	color: salmon;
}

button {
	background: none;
	border: solid 1px;
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

input::placeholder {
	opacity: 0.5;
}
</style>
