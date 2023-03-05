
<script setup>
	const shop = useShopStore();

	const itemForm = reactive({
		name: "",
		image: "",
		price: 0,
		description: "",

		options: [],
		categories: [],

		categoryCount: 1,
	});

	function add(itemForm) {
		let record = {
			name: itemForm.name,
			image: itemForm.image,
			price: itemForm.price,
			description: itemForm.description,

			options: itemForm.options,
			categories: itemForm.categories,
		};

		shop.addItem(record);

		resetForm();
	}

	function resetForm() {
		itemForm.name = "";
		itemForm.image = "";
		itemForm.price = 0;
		itemForm.options = [];
		itemForm.categories = [];
	}
</script>

<template>
	<form @submit.prevent="add(itemForm)">
		<h1 class="attention-voice">Add an Item</h1>
		<input-field>
			<label for="name"> Enter restaurant's name. </label>
			<input
				type="text"
				v-model="itemForm.name"
				id="name"
				placeholder="Item Name"
				required
			/>
		</input-field>

		<input-field>
			<label for="image"> Enter restaurant's image URL. </label>
			<input
				type="text"
				v-model="itemForm.image"
				id="image"
				placeholder="Image URL"
				required
			/>
		</input-field>

		<input-field>
			<label for="price"> Enter restaurant's price. </label>
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
			<label for="description"> Enter restaurant's description. </label>
			<textarea
				v-model="itemForm.description"
				id="description"
				placeholder="Description"
				rows="6"
			/>
		</input-field>

		<category-field>
			<div>
				<label for="categories"> Enter restaurant's categories. </label>
				<button
					class="button"
					@click.prevent="itemForm.categoryCount++"
				>
					Add Category
				</button>
			</div>
			<ul>
				<li
					v-for="index in itemForm.categoryCount"
					:key="index"
				>
					<input-field>
						<input
							type="text"
							v-model="itemForm.categories[index - 1]"
							id="categories"
							placeholder="Categories"
						/>
					</input-field>
				</li>
			</ul>
		</category-field>

		<AddItemOption :itemForm="itemForm" />

		<button class="button">Finish adding item</button>
		<!--  -->
		<ShowCode :code="itemForm" />
	</form>
</template>

<style scoped>
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

	/* input-field {
																																										position: relative;
																																									}
																																									input-field label {
																																										width: 100%;
																																										font-size: 1.3rem;
																																										transition: 0.3s ease-in-out;

																																										position: absolute;
																																										top: 50%;
																																										left: 50%;
																																										transform: translate(-45%, -50%);
																																									}

																																									input-field input:focus + label {
																																										transform: translate(-50%, -260%);
																																										font-size: 1rem;
																																									} */
</style>