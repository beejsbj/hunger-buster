
<script setup>
	const props = defineProps(["itemForm"]);

	function addOption() {
		let option = {
			name: "",
			required: false,
			multiSelect: false,
			choices: [],
		};

		props.itemForm.options.push(option);
		reFocus();
	}

	//to refocus
	const optionRef = ref(null);
	function reFocus() {
		nextTick(() => {
			optionRef.value[optionRef.value.length - 1].focus();
		});
	}
</script>

<template>
	<form
		class="add-option"
		@submit.prevent="addOption()"
	>
		<h2 class="solid-voice">Enter restaurant's options.</h2>
		<ul>
			<li
				v-for="(option, index) in itemForm.options"
				:key="index"
				class="option-field"
				:style="true ? `--choice-hue: ${index * 20}` : ''"
			>
				<input-field>
					<label for="options"> Enter Option's Name </label>
					<input
						type="text"
						v-model="option.name"
						id="options"
						placeholder="Flavor or Size"
						ref="optionRef"
						required
					/>
				</input-field>
				<input-field class="checkbox">
					<input
						type="checkbox"
						v-model="option.required"
						:id="`required${index}`"
					/>
					<label :for="`required${index}`">
						Is this option required?
					</label>
				</input-field>
				<input-field class="checkbox">
					<input
						type="checkbox"
						v-model="option.multiSelect"
						:id="`multi-select${index}`"
					/>
					<label :for="`multi-select${index}`">
						Can this option be multi-selected?
					</label>
				</input-field>

				<AddOptionChoice :option="option" />
			</li>
		</ul>

		<button class="button">Add Option</button>
	</form>
</template>

<style scoped>
	form.add-option ul {
		/* border: 4px solid red; */
		display: grid;
		gap: 10px;
	}

	input-field.checkbox {
		display: flex;
		gap: 10px;
		align-items: flex-end;
	}

	.option-field {
		background-color: hsla(var(--choice-hue), 91%, 90%, 1);
	}

	button {
		background-color: hsla(24, 93%, 66%, 1);
		color: black;
	}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>