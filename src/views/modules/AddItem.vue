
<script setup>
	import { useShopStore } from "../../stores/shop";
	const shop = useShopStore();

	const itemForm = reactive({
		name: "",
		image: "",
		price: "",
		options: [],
		categories: [],
		categoryCount: 1,
		optionsCount: 1,
	});
	const option = reactive([
		{
			name: "",
			price: "",
		},
	]);

	function add(itemForm) {
		itemForm.name = "";
		itemForm.image = "";
		itemForm.price = "";
		itemForm.options = [];
		itemForm.categories = [];
	}
</script>

<template>
	<form @submit.prevent="add(itemForm)">
		<h1 class="attention-voice">Add an Item</h1>
		<input-field>
			<input
				type="text"
				:required="false"
				v-model="itemForm.name"
				id="name"
				placeholder="Item Name"
			/>
			<label for="name"> Enter restaurant's name. </label>
		</input-field>

		<input-field>
			<input
				type="text"
				v-model="itemForm.image"
				id="image"
				placeholder="Image URL"
			/>
			<label for="image"> Enter restaurant's image URL. </label>
		</input-field>

		<input-field>
			<input
				type="text"
				v-model="itemForm.price"
				id="price"
				placeholder="Price"
			/>
			<label for="price"> Enter restaurant's price. </label>
		</input-field>

		<options-field>
			<p>Enter restaurant's options.</p>
			<input-field>
				<label for="options"> Enter restaurant's options. </label>
				<input
					type="text"
					v-model="itemForm.options"
					id="options"
					placeholder="Flavor or Size"
				/>
			</input-field>

			<ul>
				<li
					v-for="index in itemForm.optionsCount"
					:key="index"
				>
					<input-field>
						<label for="">Enter choice name</label>
						<input
							type="text"
							v-model="option.name"
							id="options"
							placeholder="Large, Beef , etc."
						/>
					</input-field>
					<input-field>
						<label for="">Enter choice price</label>
						<input
							type="text"
							v-model="option.price"
							id="options"
							placeholder="Price"
						/>
					</input-field>
				</li>
			</ul>
			<button
				class="button"
				@click="itemForm.optionsCount++"
			>
				Add Choice
			</button>
			<button
				class="button"
				@click="addOption()"
			>
				Add option
			</button>
		</options-field>

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

		<button class="button">Add Item</button>
		{{ option }}
		{{ itemForm }}
	</form>
</template>

<style>
	category-field {
		display: grid;
		gap: 10px;
	}
	category-field ul {
		display: grid;
		gap: 10px;
	}

	options-field {
		display: grid;
		gap: 10px;
	}
	options-field ul {
		display: grid;
		gap: 10px;
		grid-template-columns: 1fr 1fr;
	}
</style>