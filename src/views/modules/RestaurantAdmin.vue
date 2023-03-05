
<script setup>
	const shop = useShopStore();
	const user = useUserStore();
</script>


<template>
	<h1 class="loud-voice">RestaurantAdmin</h1>
	<!-- edit restaurant button -->
	<!-- <button
		class="button"
		@click="shop.editRestaurant"
	>
		Edit Restaurant
	</button> -->

	<!-- delete restaurant button -->
	<button
		class="button danger"
		@click="shop.deleteRestaurant()"
	>
		Delete Restaurant
	</button>
</template>

<style scoped>
	.danger {
		font-size: 2.5rem;
	}
</style>