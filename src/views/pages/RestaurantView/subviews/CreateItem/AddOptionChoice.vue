<script setup>
	const props = defineProps(["option"]);

	function addChoice() {
		let choice = {
			name: "",
			price: 0,
			selected: false,
		};

		props.option.choices.push(choice);

		reFocus();
	}

	function removeChoice(index) {
		props.option.choices.splice(index, 1);
	}

	//to refocus
	const choiceRef = ref(null);
	function reFocus() {
		nextTick(() => {
			choiceRef.value[choiceRef.value.length - 1].focus();
		});
	}
</script>

<template>
	<form
		class="add-choice"
		@submit.prevent="addChoice()"
	>
		<ul>
			<li
				v-for="(choice, index) in option.choices"
				:key="index"
				class="choice-field"
			>
				<input-field>
					<label for="choice-name">Choice name</label>
					<input
						required
						type="text"
						v-model="choice.name"
						id="choice-name"
						placeholder="Large, Beef , etc."
						ref="choiceRef"
					/>
				</input-field>
				<input-field>
					<label for="choice-price">Choice price</label>
					<input
						type="number"
						step="0.01"
						min="0"
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
					<label for="selected">
						Is this choice selected by default?
					</label>
				</input-field>
				<button
					type="button"
					class="button"
					@click.prevent="removeChoice(index)"
				>
					Remove Choice
				</button>
			</li>
		</ul>

		<button class="button">Add Choice</button>
	</form>
</template>

<style lang="scss" scoped>
	input-field.checkbox {
		display: flex;
		gap: 10px;
		align-items: flex-end;
	}
	.choice-field {
		display: grid;
		gap: 10px;
		border: 2px dashed var(--highlight);

		padding: 10px;

		filter: hue-rotate(var(--choice-hue));

		@media (min-width: 450px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.choice-field:nth-of-type(odd) {
		filter: hue-rotate(180deg);
	}

	input-field {
		padding: 0;
	}

	.choice-field button {
		justify-self: end;
		align-self: end;
	}

	form ul {
		display: grid;
		gap: 10px;
	}

	button {
		filter: brightness(1.5);
	}
</style>
