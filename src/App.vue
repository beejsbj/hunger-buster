<script setup>
	import { RouterView, useRoute } from "vue-router";
	const route = useRoute();
	const shop = useShopStore();

	onUpdated(() => {
		// let $body = document.querySelector("body");
		// if (shop.colors[5]) {
		// 	$body.style.setProperty("--highlight", shop.colors[5] ?? "inherit");
		// }
	});

	const styles = computed(() => {
		if (route.params.restaurantSlug) {
			return {
				"--highlight": shop.colors[5] ?? "inherit",
			};
		}
	});
</script>

<template>
	<AppHeader :style="styles" />

	<main
		class="outlet"
		:class="route.name"
		:style="styles"
	>
		<section>
			<inner-column>
				<!-- <RouterView v-slot="{ Component, route }">
					<Transition
						mode="out-in"
						name="fade"
					>
						<Component
							:is="Component"
							:key="route.params.name"
						/>
					</Transition>
				</RouterView> -->

				<RouterView />
			</inner-column>
		</section>
	</main>
	<AppFooter :style="styles" />
</template>

<style lang="scss"></style>
