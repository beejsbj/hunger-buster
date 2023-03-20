<script setup>
	import Multiselect from "@vueform/multiselect";

	const props = defineProps(["itemForm"]);
	const shop = useShopStore();
</script>

<template>
	<category-field>
		<label for="categories"> Add Item's categories. </label>
		<Multiselect
			id="categories"
			v-model="itemForm.categories"
			mode="tags"
			:close-on-select="false"
			:searchable="true"
			:create-option="true"
			:options="shop.restaurant.categories"
			:on-create="shop.addCategory"
		/>
	</category-field>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
