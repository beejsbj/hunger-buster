

<script setup>
	const props = defineProps(["order"]);
</script>

<template>
	<order-card>
		<h1 class="solid-voice">Order #{{ order.id }}</h1>
		<p>
			{{ order.restaurant.name }}
		</p>
		<p>
			{{ order.restaurant.address.formatted_address }}
		</p>

		<p>{{ order.deliveryMethod }} : {{ order.deliveryFee }}</p>

		<p>Total: {{ order.total }}</p>
	</order-card>
</template>

<style scoped>
	order-card {
		display: grid;
		gap: 10px;
		background: wheat;
	}
</style>
