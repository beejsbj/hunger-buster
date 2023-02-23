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
			<template v-for="category in categories" :key="category.id">
				<li>
					<input-field>
						<input
							:id="category.id"
							:value="category.id"
							type="checkbox"
							@change="$emit('update:checked', emitChecked(category))"
						/>
						<label :for="category.id"> {{ category.name }}</label>
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
		border-radius: 5px;
		padding: 5px 10px;
	}
	input:checked + label {
		background: dodgerblue;
	}
</style>