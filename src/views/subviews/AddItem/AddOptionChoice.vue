
<script setup>
	const props = defineProps(["option"]);

	const choice = reactive({
		name: "",
		price: 0,
		selected: false,
	});

	function addChoice() {
		let record = {
			name: choice.name,
			price: choice.price,
			selected: choice.selected,
		};

		props.option.choices.push(record);

		choice.name = "";
		choice.price = 0;

		reFocus();
	}

	//to refocus
	const choiceName = ref(null);
	function reFocus() {
		nextTick(() => {
			choiceName.value.focus();
		});
	}
</script>

<template>
	<form
		class="add-choice"
		@submit.prevent="addChoice()"
	>
		<input-field>
			<label for="choice-name">Enter choice name</label>
			<input
				type="text"
				v-model="choice.name"
				id="choice-name"
				placeholder="Large, Beef , etc."
				ref="choiceName"
				required
			/>
		</input-field>
		<input-field>
			<label for="choice-price">Enter choice price</label>
			<input
				type="text"
				v-model.number="choice.price"
				id="choice-price"
				placeholder="Price"
			/>
		</input-field>
		<input-field class="checkbox">
			<input
				type="checkbox"
				v-model="choice.selected"
				id="selected"
			/>
			<label for="selected"> Is this choice selected by default? </label>
		</input-field>

		<button class="button">Add Choice</button>
	</form>
</template>

<style scoped>
	form.add-choice {
		border: 2px dashed blue;
		padding: 20px;
	}
	input-field.checkbox {
		display: flex;
		gap: 10px;
		align-items: flex-end;
	}
</style>