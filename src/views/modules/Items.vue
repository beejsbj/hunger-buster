<script setup>
	import Item from "./Item.vue";
	import ItemCard from "../../components/ItemCard.vue";
	import { computed, ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useShopStore } from "../../stores/shop.js";
	import { collection, query, where } from "firebase/firestore";
	import { useFirestore, useCollection } from "vuefire";

	const db = useFirestore();
	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();

	const filter = ref("");

	const props = defineProps(["restaurant"]);

	const itemRef = collection(db, "items");
	const queried = query(itemRef, where("belongsTo", "==", props.restaurant.id));

	const items = useCollection(queried);

	const filtered = computed(function () {
		return items.value.filter(function (item) {
			if (filter.value) {
				return item.name.toLowerCase().includes(filter.value);
			}
			return items;
		});
	});
</script>
<template>
	<restaurant-detail>
		<input-field>
			<input
				class="filter"
				type="text"
				v-model="filter"
				placeholder="Filter items"
			/>
		</input-field>
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
