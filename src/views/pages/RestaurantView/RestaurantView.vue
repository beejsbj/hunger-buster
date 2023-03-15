<script setup>
	///////////////////////////////////////////
	const shop = useShopStore();

	// watch(
	// 	shop.restaurant,
	// 	() => {
	// 		console.log("watching shop.colors", shop.colors);
	// 		let $body = document.querySelector("body");
	// 		if (shop.colors[5]) {
	// 			$body.style.setProperty("--highlight", shop.colors[5]);
	// 		}
	// 	},
	// 	{ deep: true }
	// );
</script>

<template>
	<article v-if="shop.restaurant">
		<RestaurantBanner :restaurant="shop.restaurant" />

		<RestaurantHeader />

		<sub-view>
			<RouterView
				:restaurant="shop.restaurant"
				:cart="shop.cart"
			/>
			<!-- <RouterView
				:restaurant="shop.restaurant"
				:cart="shop.cart"
				v-slot="{ Component, route }"
			>
				#todo add transition
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
			</RouterView> -->
		</sub-view>
	</article>
</template>

<style lang="scss" scoped>
	article {
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
