<script setup>
	import { RouterView, useRoute } from "vue-router";

	const route = useRoute();
</script>

<template>
	<AppHeader />

	<main
		class="outlet"
		:class="route.name"
	>
		<section>
			<inner-column>
				<!-- <RouterView v-slot="{ Component, route }">
					<Transition
						mode="out-in"
						name="fade"
					>
						<Component :is="Component" />
					</Transition>
				</RouterView> -->

				<RouterView />
			</inner-column>
		</section>
	</main>
	<AppFooter />
</template>

<style lang="scss"></style>
