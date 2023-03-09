<script setup>
	const shop = useShopStore();
	const props = defineProps(["restaurant"]);

	const search = ref("");
	const checked = ref([]);

	const { items } = storeToRefs(shop);

	const categoryFiltered = computed(function () {
		return items.value.filter(function (item) {
			if (checked.value.length) {
				return checked.value.some(function (check) {
					return item.category.includes(check.id);
				});
			}
			return items;
		});
	});

	const filtered = computed(function () {
		return categoryFiltered.value.filter(function (item) {
			if (search.value) {
				return item.name.toLowerCase().includes(search.value);
			}
			return categoryFiltered;
		});
	});
</script>
<template>
	<restaurant-detail>
		<input-field>
			<input
				class="search"
				type="text"
				v-model="search"
				placeholder="Search items"
			/>
		</input-field>
		<CategoryFilter
			:categories="restaurant?.categories"
			v-model:checked="checked"
		/>
		<menu-items v-if="items">
			<TransitionGroup
				class="items-list"
				name="list"
				tag="ul"
			>
				<li
					:key="item.id"
					v-for="item in filtered"
				>
					<ItemCard :item="item" />
				</li>
			</TransitionGroup>
		</menu-items>
	</restaurant-detail>
</template>

<style lang="scss" scoped>
	restaurant-detail {
		display: grid;
		gap: 20px;
	}
</style>
