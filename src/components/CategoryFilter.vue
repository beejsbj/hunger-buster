<script setup>
	defineProps(["categories"]);
	const checked = ref([]);
</script>


<template>
	<category-filter>
		<ul>
			<template v-for="category in categories" :key="category.id">
				<li>
					<input-field>
						<input
							:id="category.id"
							:value="category"
							type="checkbox"
							v-model="checked"
						/>
						<label :for="category.id"> {{ category.name }}</label>

					</input-field>
				</li>
			</template>
		</ul>
		{{checked}}
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