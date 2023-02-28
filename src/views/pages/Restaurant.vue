<script setup>
	///////////////////////////////////////////
	const route = useRoute();
	const shop = useShopStore();
	const db = useFirestore();
	const user = useUserStore();
	// const carts = useCartsStore();
	//////////////////////////////////////////

	// const restaurant = shop.getRestaurant(route.params.restaurantSlug);

	// const cartRef = computed(function () {
	// 	if (restaurant.value) {
	// 		return collection(
	// 			db,
	// 			"users",
	// 			user?.id,
	// 			"carts",
	// 			`cart_${restaurant?.value[0].id}`,
	// 			"items"
	// 		);
	// 	}
	// });
	// const cartItems = useCollection(cartRef);

	// const restaurantId = computed(() => restaurant?.value[0]?.id);

	// const cartItems = useCollection(docRef);

	const { restaurant, cart } = storeToRefs(shop);

	// const cartSize = ref(4);
	const cartSize = cart.value.length;
	//
</script>

<template>
	<article v-if="restaurant[0]">
		<header class="restaurant">
			<RestaurantBanner
				:restaurant="restaurant[0]"
				:cartSize="cartSize"
			/>
		</header>
		<sub-view>
			<RouterView
				:restaurant="restaurant[0]"
				:cart="cart"
				v-slot="{ Component, route }"
			>
				<!-- route.meta.transition -->
				<Transition
					mode="out-in"
					appear
					name="fade"
				>
					<Component
						:is="Component"
						:key="route.name"
					/>
				</Transition>
			</RouterView>
		</sub-view>
	</article>
</template>

<style lang="scss" scoped>
	header,
	article {
		display: grid;
		gap: 20px;
		overflow-x: hidden;
	}
	sub-view {
		// border: 3px solid blue;
		// overflow-x: hidden;
		// width: 100%;
	}

	.slide-to-left-enter-active,
	.slide-to-right-enter-active {
		transition: 0.5s ease-in-out;
		width: 100%;
	}
	.slide-to-left-leave-active,
	.slide-to-right-leave-active {
		transition: 0.5s ease-in-out;
		width: 100%;
		position: absolute;
	}

	.slide-to-right-leave-to,
	.slide-to-left-enter-from {
		transform: translateX(-100%);
		position: absolute;
		// opacity: 0;
	}

	.slide-to-left-leave-to,
	.slide-to-right-enter-from {
		transform: translateX(100%);
		position: absolute;
		// opacity: 0;
	}
</style>
