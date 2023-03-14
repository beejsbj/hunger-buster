
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

	function setImage(file) {
		itemForm.value.image = file;
	}
	function submit() {
		const record = { ...itemForm.value };
		shop.createItem(record);
	}
</script>

<template>
	<form
		@submit.prevent="submit()"
		enctype="multipart/form-data"
	>
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

		<FileUpload @setImage="setImage" />

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

		<CreateItemCategory :itemForm="itemForm" />

		<CreateItemOption :itemForm="itemForm" />

		<button class="button">Finish adding item</button>
	</form>
</template>

<style scoped>
	form {
		display: grid;
		/* justify-content: start; */
		max-width: 500px;
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