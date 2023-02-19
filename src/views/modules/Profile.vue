<script setup>
	const user = useUserStore();


	// console.log(user.userDocument)


</script>

<template>
	<profile-view>
		<header class="profile">
			<nav>
				<RouterLink to="/user/about">About</RouterLink>
				<RouterLink to="/user/favorites">Favorties</RouterLink>
			</nav>
		</header>

		<ProfileBanner :profile="user.profile" />

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
