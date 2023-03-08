
<script setup>
	import { useStorage } from "@vueuse/core";
	const shop = useShopStore();

	const itemForm = useStorage(`${shop.restaurant.id}-itemForm`, {
		name: "",
		image: "",
		price: 0,
		description: "",
		categories: [],
		options: [
			{
				name: "",
				required: false,
				multiSelect: false,
				choices: [
					{
						name: "",
						price: 0,
						selected: false,
					},
				],
			},
		],
	});
</script>

<template>
	<form @submit.prevent="shop.addItem(itemForm)">
		<h1 class="attention-voice">Add an Item</h1>
		<input-field>
			<label for="name"> Enter Item's name. </label>
			<input
				type="text"
				v-model="itemForm.name"
				id="name"
				placeholder="Item Name"
				required
			/>
		</input-field>

		<input-field>
			<label for="image"> Enter Item's image URL. </label>
			<input
				type="text"
				v-model="itemForm.image"
				id="image"
				placeholder="Image URL"
				required
			/>
		</input-field>

		<input-field>
			<label for="price"> Enter Item's price. </label>
			<input
				type="number"
				v-model.number="itemForm.price"
				step="0.01"
				min="0"
				id="price"
				placeholder="Price"
				required
			/>
		</input-field>

		<input-field>
			<label for="description"> Enter Item's description. </label>
			<textarea
				v-model="itemForm.description"
				id="description"
				placeholder="Description"
				rows="6"
			/>
		</input-field>

		<AddItemCategory :itemForm="itemForm" />

		<AddItemOption :itemForm="itemForm" />

		<button class="button">Finish adding item</button>
		<!--  -->
		<ShowCode :code="itemForm" />
	</form>
</template>

<style scoped>
	form {
		display: grid;
		justify-content: center;
	}

	category-field {
		background-color: hsla(120, 100%, 85%, 1);
		display: grid;
		gap: 10px;
	}
	category-field ul {
		display: grid;
		gap: 10px;
	}

	options-field {
		border: 4px solid red;
		display: grid;
		gap: 10px;
	}
	options-field ul {
		display: grid;
		gap: 10px;
	}

	choice-field {
		border: 2px dashed blue;
	}
</style>