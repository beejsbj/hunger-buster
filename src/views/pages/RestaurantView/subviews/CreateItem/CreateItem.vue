<script setup>
	import { useStorage } from "@vueuse/core";
	const shop = useShopStore();
	const props = defineProps(["item", "editing"]);
	const emit = defineEmits(["close"]);

	const itemForm = props.editing
		? props.item
		: useStorage(`${shop.restaurant.id}-itemForm`, {
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

	const itemImage = ref(null);

	function setImage(file) {
		itemImage.value = file;
	}
	function submit() {
		const record = props.editing ? itemForm : { ...itemForm.value };
		record.image = itemImage.value ?? record.image;
		shop.createItem(record);

		if (props.editing) {
			emit("close");
		}
	}
</script>

<template>
	<form
		@submit.prevent="submit()"
		enctype="multipart/form-data"
	>
		<h1 class="attention-voice">
			{{ props.editing ? "Edit" : "Add" }} an Item
		</h1>
		<input-field>
			<label for="name"> name. </label>
			<input
				type="text"
				v-model="itemForm.name"
				id="name"
				placeholder="Item Name"
				required
			/>
		</input-field>

		<FileUpload
			@setImage="setImage"
			:image="itemForm.image"
		/>

		<input-field>
			<label for="price"> price. </label>
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
			<label for="description"> description. </label>
			<textarea
				v-model="itemForm.description"
				id="description"
				placeholder="Description"
				rows="6"
			/>
		</input-field>

		<CreateItemCategory :itemForm="itemForm" />
		<CreateItemOption :itemForm="itemForm" />

		<button class="button">
			Finish {{ props.editing ? "editing" : "adding" }} item
		</button>
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
