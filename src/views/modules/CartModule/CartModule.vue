<script setup>
	//////////////////////////////////////////

	const shop = useShopStore();
</script>

<template>
	<cart-module class="styled-cart-module">
		<h2 class="solid-voice">Items</h2>
		<TransitionGroup
			name="list"
			tag="ul"
			class="cart-items"
		>
			<template
				v-for="item in shop.cart"
				:key="item.id"
			>
				<CartItemCard :item="item" />
			</template>
		</TransitionGroup>
		<button
			class="button clearcart"
			@click="shop.clearCart(cart)"
		>
			Clear Cart
		</button>
	</cart-module>
</template>

<style scoped>
	article {
		display: grid;
		gap: 20px;
	}
	cart-module,
	ul.cart-items {
		/*		width: 100%;*/
		display: grid;
		gap: 20px;
	}

	button.clearcart {
		background-color: var(--highlight);
	}
</style>
