<script setup>
	const route = useRoute();
	const shop = useShopStore();

	const restaurant = shop.getRestaurant(route.params.restaurantSlug);
</script>

<template>
	<article v-if="restaurant">
		<header class="restaurant">
			<RestaurantBanner :restaurant="restaurant[0]" :cartSize="cartSize" />
		</header>
		<sub-view>
			<RouterView :restaurant="restaurant[0]" v-slot="{ Component, route }">
				<Transition appear :name="route.meta.transition">
					<Component :is="Component" :key="route.path" />
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
	}
	sub-view {
		overflow: hidden;
		// position: relative;
		width: 100%;
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
