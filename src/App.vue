<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useShopStore } from "./stores/shop.js";

const route = useRoute();
const shop = useShopStore();

// var cartCount = shop.cart.length;
</script>

<template>
	<header>
		<inner-column>
			<nav class="site-menu">
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
				<RouterLink to="/e4p">Add Item</RouterLink>
				<RouterLink to="/items">Items</RouterLink>
				<RouterLink to="/cart" class="cart">Cart 
					<span :class="{cartCount: shop.cart.length}">{{shop.cart.length}}</span
				></RouterLink>
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
</style>
