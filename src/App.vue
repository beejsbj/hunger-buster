<script setup>
	import { RouterView, useRoute } from "vue-router";
	const route = useRoute();
	const shop = useShopStore();

	// onUpdated(() => {
	// let $body = document.querySelector("body");
	// if (shop.colors[5]) {
	// 	$body.style.setProperty("--highlight", shop.colors[5] ?? "inherit");
	// }
	// });

	const styles = computed(() => {
		if (route.params.restaurantSlug) {
			return {
				color: shop.colors[5] ?? "var(--blue)",
			};
		}
	});
</script>

<template>
	<AppHeader />

	<main
		class="outlet"
		:class="route.name"
	>
		<section>
			<inner-column>
				<RouterView
					v-slot="{ Component, route }"
					appear
				>
					<Transition
						mode="out-in"
						name="fade"
					>
						<Component :is="Component" />
					</Transition>
				</RouterView>

				<!-- <RouterView /> -->
			</inner-column>
		</section>
	</main>
	<AppFooter />
</template>

<style lang="scss">
	body > * {
		--highlight: v-bind("shop.colors[5] ?? 'var(--blue)'");
	}
</style>
