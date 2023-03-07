
<script setup>
	import { useStorage } from "@vueuse/core";

	const props = defineProps(["itemForm"]);

	const option = useStorage("addItemOptionForm", {
		name: "",
		choices: [],
		required: false,
		multiSelect: false,
	});

	function addOption() {
		let record = {
			name: option.value.name,
			choices: option.value.choices,
			required: option.value.required,
			multiSelect: option.value.multiSelect,
		};

		props.itemForm.options.push(record);

		option.value.name = "";
		option.value.choices = [];
		option.value.required = false;
		option.value.multiSelect = false;
	}

	//to refocus
	const optionName = ref(null);
	function reFocus() {
		nextTick(() => {
			optionName.value.focus();
		});
	}
</script>

<template>
	<form
		class="add-option"
		@submit.prevent="addOption()"
	>
		<h2 class="solid-voice">Enter restaurant's options.</h2>
		<input-field>
			<label for="options"> Enter Option's Name </label>
			<input
				type="text"
				v-model="option.name"
				id="options"
				placeholder="Flavor or Size"
				ref="optionName"
				required
			/>
		</input-field>
		<input-field class="checkbox">
			<input
				type="checkbox"
				v-model="option.required"
				id="required"
			/>
			<label for="required"> Is this option required? </label>
		</input-field>
		<input-field class="checkbox">
			<input
				type="checkbox"
				v-model="option.multiSelect"
				id="multi-select"
			/>
			<label for="multi-select"> Can this option be multi-selected? </label>
		</input-field>

		<AddOptionChoice :option="option" />

		<button class="button">
			Finish adding this option with
			<span>{{ option.choices.length }}</span>
			choices
		</button>
		<ShowCode :code="option" />
	</form>
</template>

<style scoped>
	form.add-option {
		/* border: 4px solid red; */
		display: grid;
		gap: 10px;
		background-color: hsla(49, 91%, 86%, 1);
	}

	input-field.checkbox {
		display: flex;
		gap: 10px;
		align-items: flex-end;
	}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>