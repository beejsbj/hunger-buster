<script setup>
	import AppHeaderNav from "./AppHeaderNav.vue";
	import { useRouter } from "vue-router";

	const ui = useInterfaceStore();
	const router = useRouter();
</script>

<template>
	<header>
		<inner-column>
			<picture
				class="logo"
				@click="router.push('/')"
			>
				<img
					src="/src/assets/logo.svg"
					alt=""
				/>
			</picture>
			<site-menu>
				<template v-if="ui.isMobile">
					<button
						class="menu-toggle button"
						@click="ui.toggleMenu"
					>
						Menu
					</button>
					<Teleport to="body">
						<Transition name="fade">
							<div
								class="modal-mask"
								@click="ui.toggleMenu"
								v-if="ui.mainMenuOpen"
							>
								<AppHeaderNav />
							</div>
						</Transition>
					</Teleport>
				</template>
				<template v-else>
					<AppHeaderNav />
				</template>
			</site-menu>
			<AddressAutoFill />
		</inner-column>
	</header>
</template>

<style lang="scss" scoped>
	picture.logo {
		cursor: pointer;
	}
	header inner-column {
		display: grid;
		grid-template-columns: 0.2fr 1fr;
		gap: 20px;
		align-items: center;

		@media (min-width: 750px) {
			grid-template-columns: 0.5fr 1fr 1fr;
			site-menu {
				order: 3;
			}
		}

		.logo {
			max-width: 60px;
		}
	}
	site-menu {
		justify-self: end;

		display: block;
		button.menu-toggle {
			display: none;
			@media (max-width: 450px) {
				display: initial;
			}
		}
	}

	div.gmap-auto-complete {
		grid-column: 1 / -1;
		border-radius: var(--corners);
		@media (min-width: 750px) {
			grid-column: unset;
		}
	}
</style>
