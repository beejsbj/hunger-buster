<script setup>
	import { RouterLink, RouterView, useRoute } from "vue-router";
	import { useUserStore } from "./stores/user.js";
	import { useInterfaceStore } from "./stores/interface.js";
	const route = useRoute();
	const user = useUserStore();
	const carts = useCartsStore();
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
				<button
					class="menu-toggle"
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
				>
					<RouterLink to="/">Home</RouterLink>
					<RouterLink to="/restaurants">Restaurants</RouterLink>
					<RouterLink
						v-if="carts.carts?.length"
						to="/carts"
						class="cart"
						>Carts</RouterLink
					>
					<RouterLink
						to="/user"
						v-if="user.current"
					>
						Profile
					</RouterLink>
					<RouterLink
						to="/login"
						v-if="!user.current"
					>
						Login
					</RouterLink>
					<button
						@click="user.logout()"
						v-if="user.current"
					>
						Logout
					</button>
				</TransitionGroup>
			</site-menu>
		</inner-column>
	</header>

	<main
		class="outlet"
		:class="route.name"
	>
		<section>
			<inner-column>
				<!-- <RouterView /> -->
				<RouterView v-slot="{ Component, route }">
					<Transition
						mode="out-in"
						name="fade"
					>
						<Component
							:is="Component"
							:key="route.name"
						/>
					</Transition>
				</RouterView>
			</inner-column>
		</section>
	</main>
	<footer>
		<inner-column>
			<h2 class="attention-voice">footer</h2>
		</inner-column>
	</footer>
</template>

<style lang="scss">
	header inner-column {
		display: flex;
		justify-content: space-between;
		.logo {
			max-width: 60px;
		}
	}
	site-menu {
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
			flex-wrap: wrap;
			gap: 10px;
			transition: 0.2s;
			transform: translateX(0%);
			@media (max-width: 450px) {
				&.menu-close {
					transform: translateX(-100%);
				}
				&.menu-open {
					// display: none;
					transform: translateX(0%);
				}
			}

			a {
				&.cart {
					position: relative;

					span {
						display: none;
					}

					.cartCount {
						display: initial;
						font-size: 0.8em;
						/*	vertical-align: super;*/
						background: yellowgreen;
						color: black;
						position: absolute;
						top: -10px;
						right: -5px;
					}
				}
			}
		}
	}
</style>
