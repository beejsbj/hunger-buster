<script setup>
	import AddRestaurant from "../../BusinessView/subviews/AddRestaurant.vue";

	const shop = useShopStore();
	const editing = ref(true);
</script>

<template>
	<admin-panel>
		<h1 class="loud-voice">RestaurantAdmin</h1>
		<!-- edit restaurant button -->

		<AddRestaurant
			v-if="editing"
			:editing="editing"
			:restaurant="shop.restaurant"
		/>

		<!-- delete restaurant button -->
		<button
			class="button danger"
			@click="shop.deleteRestaurant(shop.restaurant)"
		>
			Delete Restaurant
		</button>
	</admin-panel>
</template>

<style scoped>
	admin-panel {
		display: grid;
		gap: 20px;
	}
	.danger {
		font-size: 2.5rem;
	}
</style>
