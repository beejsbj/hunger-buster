<script setup>
	import { RouterLink, RouterView, useRoute } from "vue-router";
	import { useUserStore } from "@/stores/user.js";
	import { useInterfaceStore } from "@/stores/interface.js";
	const route = useRoute();
	const user = useUserStore();
	const shop = useShopStore();
	const ui = useInterfaceStore();
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
						<Component
							:is="Component"
							:key="route.params.name"
						/>
					</Transition>
				</RouterView>
			</inner-column>
		</section>
	</main>
	<AppFooter />
</template>

<style lang="scss">
</style>
