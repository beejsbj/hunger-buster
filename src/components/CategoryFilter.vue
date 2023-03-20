<script setup>
	const props = defineProps(["categories", "checked"]);
	defineEmits(["update:checked"]);

	function emitChecked(value) {
		let array = [...props.checked];
		let index = array.indexOf(value);

		if (index >= 0) {
			array.splice(index, 1);
		} else {
			array.push(value);
		}
		return array;
	}
</script>

<template>
	<category-filter>
		<ul>
			<template
				v-for="category in categories"
				:key="category.value"
			>
				<li>
					<input-field>
						<input
							:id="category.value"
							:value="category.value"
							type="checkbox"
							@change="$emit('update:checked', emitChecked(category))"
						/>
						<label :for="category.value"> {{ category.label }}</label>
					</input-field>
				</li>
			</template>
		</ul>
	</category-filter>
</template>

<style scoped>
	category-filter ul {
		display: flex;
		gap: 10px;
	}
	input {
		display: none;
	}
	label {
		cursor: pointer;
		background: white;
		border: 1px solid black;
		border-radius: var(--corners);
		padding: 5px 10px;
	}
	input:checked + label {
		background: dodgerblue;
	}
</style>
