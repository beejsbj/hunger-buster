<script setup>
	//////////////////////////////////////////

	const shop = useShopStore();
	const props = defineProps(["restaurant", "cart"]);

	const taxRate = ref(0.13);

	const order = reactive({
		restaurant: props.restaurant,
		tip: 5,
		deliveryFee: 0,
	});

	order.items = computed(() => {
		return props.cart;
	});

	order.tax = computed(() => {
		return shop.cartTotal * taxRate.value;
	});

	order.subtotal = computed(() => {
		return Number(shop.cartTotal).toFixed(2);
	});

	order.total = computed(() => {
		return (
			Number(shop.cartTotal) +
			Number(order.tip) +
			Number(order.tax)
		).toFixed(2);
	});

	//////////////////////////////////////////
</script>

<template>
	<article v-if="cart?.length">
		<CartModule />

		<PaymentComponent
			:cart="cart"
			:order="order"
		/>
		<RestaurantCheckout
			:cart="cart"
			:order="order"
		/>
		<div class="buttons">
			<RouterLink
				class="button hide"
				:to="`/restaurant/${restaurant.id}/checkout`"
			>
				Checkout • ${{ order.total }}
			</RouterLink>
		</div>
	</article>
</template>

<style scoped>
	article {
		display: grid;
		gap: 20px;
	}
</style>
