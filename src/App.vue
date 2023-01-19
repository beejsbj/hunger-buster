<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useShopStore } from "./stores/shop.js";
import { useInterfaceStore } from "./stores/interface.js";

const route = useRoute();
const shop = useShopStore();
const ui = useInterfaceStore();
</script>

<template>
	<header>
		<inner-column>
			<button @click="ui.toggleMenu">
				{{ ui.mainMenuOpen ? "close" : "open" }}
			</button>
			<nav
				class="site-menu"
				:class="{
					'menu-open': ui.mainMenuOpen,
					'menu-close': !ui.mainMenuOpen,
				}"
			>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
				<RouterLink to="/create">Create Item</RouterLink>
				<RouterLink to="/items">Items</RouterLink>
				<RouterLink to="/cart" class="cart"
					>Cart
					<span :class="{ cartCount: shop.list.cart.length }">{{
						shop.list.cart.length
					}}</span></RouterLink
				>
			</nav>
		</inner-column>
	</header>

	<main class="outlet" :class="route.name">
		<section>
			<inner-column>
				<RouterView />
			</inner-column>
		</section>
	</main>
	<footer>
		<inner-column>
			<h2 class="attention-voice">footer</h2>
		</inner-column>
	</footer>
</template>

<style>
nav.site-menu {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.site-menu a {
	padding: 10px;
}

.router-link-active {
	background-color: salmon;
}

.cart {
	position: relative;
}
.cart span {
	display: none;
}

.cart .cartCount {
	display: initial;
	font-size: 0.8em;
	/*	vertical-align: super;*/
	background: yellowgreen;
	color: black;
	position: absolute;
	top: -10px;
	right: -5px;
}

nav.menu-close {
	display: none;
}
</style>
