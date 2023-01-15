<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<header>
		<div class="inner-column">
			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
				<RouterLink to="/e4p">Exercises</RouterLink>
			</nav>
		</div>
	</header>

	<main class="outlet">
		<div class="inner-column">
			<RouterView />
		</div>
	</main>
	<footer>
		<div class="inner-column">
			footer
		</div>
	</footer>
</template>

<style>

nav {
	display: flex;
	gap: 10px;
}


</style>
