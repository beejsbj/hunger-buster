<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import ProfileBanner from "../../components/ProfileBanner.vue";
</script>

<template>
	<profile-view>
		<header class="profile">
			<nav>
				<RouterLink to="/user/about">About</RouterLink>
				<RouterLink to="/user/favorites">Favorties</RouterLink>
			</nav>
		</header>

		<ProfileBanner />

		<sub-view>
			<RouterView />
		</sub-view>
	</profile-view>
</template>

<style lang="scss" scoped>
	profile-view {
		display: grid;
		gap: 20px;
	}
</style>
