<script setup>
	import { useUserStore } from "../stores/user.js";
	import { RouterLink, RouterView, useRoute } from "vue-router";
	const user = useUserStore();
</script>

<template>
	<profile-view>
		<header class="profile">
			<nav>
				<RouterLink to="/user/about">About</RouterLink>
				<RouterLink to="/user/favorites">Favorties</RouterLink>
			</nav>
		</header>
		<profile-banner>
			<h1 class="loud-voice">
				{{ user.profile.name }}
			</h1>
			<picture>
				<img
					:src="user.profile.image"
					alt=""
				/>
			</picture>
		</profile-banner>

		<sub-view>
			<RouterView />
		</sub-view>
	</profile-view>
</template>
<style scoped>
	profile-banner {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
	}
</style>
