<script setup>
	import { RouterView, useRoute } from "vue-router";

	const route = useRoute();
	const shop = useShopStore();

	const styles = computed(() => {
		if (route.params.restaurantSlug && shop.colors[0]) {
			let color = shop.colors.find(
				(color) => color.lightness > 0.2 && color.lightness < 0.8
			);
			return {
				color: color.hex,
			};
		}
		return {
			color: "var(--blue)",
		};
	});

	watch(styles, (newVal) => {
		console.log(document.documentElement);
		document.documentElement.style.setProperty("--highlight", newVal.color);
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
				<RouterView v-slot="{ Component, route }">
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

<style lang="scss"></style>
