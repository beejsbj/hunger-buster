<script setup>
	import { collection, query, where } from "firebase/firestore";

	const db = useFirestore();
	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();
	const props = defineProps(["restaurant"]);


	const search = ref("");
	const checked = ref([]);


	const itemRef = collection(db, "items");
	const queried = query(itemRef, where("belongsTo", "==", props.restaurant.id));
	const items = useCollection(queried);

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
		{{ checked }}
		<menu-items v-if="items">
			<ul class="items-list">
				<li :key="item.id" v-for="item in filtered">
					<ItemCard :item="item" />
					<Item :item="item" />
				</li>
			</ul>
		</menu-items>
	</restaurant-detail>
</template>
<style lang="scss" scoped>
	restaurant-detail {
		display: grid;
		gap: 20px;
	}
</style>
