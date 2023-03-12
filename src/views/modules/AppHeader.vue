<script setup>
	const user = useUserStore();
	const shop = useShopStore();
	const ui = useInterfaceStore();

	const navRef = ref(null);

	watch(navRef, async (newVal) => {
		await nextTick();

		if (newVal === null) {
			return;
		}
		newVal.$el.childNodes.forEach((el) => {
			if (el.classList.contains("router-link-active")) {
				ui.navUnderline({
					target: el,
				});
			}
		});
	});
	// #fixme: this is a hacky solution to the problem of the underline not being initialized on the first page load
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
			<GMapAutocomplete
				id="delivery-address"
				@place_changed="user.setUserLocation"
				:value="user.address?.formatted_address ?? 'Enter your address'"
			/>
			<site-menu>
				<button
					class="menu-toggle button"
					@click="ui.toggleMenu"
				>
					{{ ui.mainMenuOpen ? "close" : "open" }}
				</button>
				<TransitionGroup
					name="list"
					tag="nav"
					:class="{
						'menu-open': ui.mainMenuOpen,
						'menu-close': !ui.mainMenuOpen,
					}"
					@click="ui.navUnderline($event)"
					ref="navRef"
				>
					<RouterLink
						key="home"
						to="/"
					>
						Home
					</RouterLink>
					<RouterLink
						key="restaurants"
						to="/restaurants"
					>
						Restaurants
					</RouterLink>
					<RouterLink
						key="carts"
						v-if="shop.carts?.length && false"
						to="/carts"
						class="cart"
						>Carts</RouterLink
					>
					<RouterLink
						key="user"
						to="/user"
						v-if="user.current"
					>
						Profile
					</RouterLink>
					<RouterLink
						key="login"
						to="/login"
						v-if="!user.current"
					>
						Login
					</RouterLink>
					<button
						class="button"
						key="logout"
						@click="user.logout()"
						v-if="user.current"
					>
						Logout
					</button>
				</TransitionGroup>
			</site-menu>
		</inner-column>
	</header>
</template>

<style lang="scss" scoped>
	header inner-column {
		display: grid;
		grid-template-columns: 0.2fr 1fr;
		justify-content: space-between;
		.logo {
			max-width: 60px;
		}
		@media (min-width: 750px) {
			grid-template-columns: 0.2fr 0.5fr;
			justify-content: space-between;
		}

		input {
			align-self: center;
		}
	}
	site-menu {
		grid-column: 1 / -1;
		@media (min-width: 750px) {
			grid-column: 3 / -1;
		}

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
			transition: 0.2s;
			transform: translateX(0%);
			@media (max-width: 450px) {
				&.menu-close {
					transform: translateX(100%);
				}
				&.menu-open {
					// display: none;
					transform: translateX(0%);
				}
			}
		}
	}
</style>