<script setup>
	import AppHeaderNav from "./AppHeaderNav.vue";

	const user = useUserStore();
	const ui = useInterfaceStore();
</script>

<template>
	<header>
		<inner-column>
			<picture class="logo">
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

			<div class="gmap-auto-complete">
				<GMapAutocomplete
					id="delivery-address"
					@place_changed="user.setUserLocation"
					:value="user.address?.formatted_address ?? 'Enter your address'"
				/>
				<Skeleton :pill="true" />
			</div>
		</inner-column>
	</header>
</template>

<style lang="scss" scoped>
	header inner-column {
		display: grid;
		grid-template-columns: 0.2fr 1fr;
		gap: 20px;
		align-items: center;

		.logo {
			max-width: 60px;
		}

		div.gmap-auto-complete {
			align-self: center;
			grid-column: 1 / -1;
			display: grid;
		}
	}
	site-menu {
		justify-self: end;

		overflow: hidden;
		display: block;
		button.menu-toggle {
			display: none;
			@media (max-width: 450px) {
				display: initial;
			}
		}
		nav {
			display: flex;
			position: relative;
			flex-wrap: wrap;
			gap: 10px;
			transition: 0.2s 0.2s;
			transform: translateX(0%);
		}
	}
</style>
