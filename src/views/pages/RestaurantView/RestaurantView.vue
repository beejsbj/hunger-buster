<script setup>
	///////////////////////////////////////////
	const shop = useShopStore();
</script>

<template>
	<restaurant-module v-if="shop.restaurant">
		<RestaurantBanner :restaurant="shop.restaurant" />

		<RestaurantHeader />

		<sub-view>
			<!-- <RouterView
				:restaurant="shop.restaurant"
				:cart="shop.cart"
			/> -->
			<RouterView
				:restaurant="shop.restaurant"
				:cart="shop.cart"
				v-slot="{ Component, route }"
				appear
			>
				<Transition
					mode="out-in"
					:name="true ? 'fade' : route.meta.transition"
				>
					<Component
						:is="Component"
						:key="route.name"
					/>
				</Transition>
			</RouterView>
		</sub-view>
	</restaurant-module>
</template>

<style lang="scss" scoped>
	restaurant-module {
		display: grid;
		gap: 20px;
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
