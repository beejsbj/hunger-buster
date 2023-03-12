<script setup>
	const user = useUserStore();
	const ui = useInterfaceStore();

	const navRef = ref(null);

	onMounted(() => {
		ui.navUnderline({
			target: navRef.value.querySelector("a.router-link-active"),
		});
	});
</script>

<template>
	<profile-view>
		<ProfileBanner :profile="user.profile" />

		<header class="profile">
			<nav
				ref="navRef"
				@click="ui.navUnderline($event)"
			>
				<RouterLink
					class="business"
					to="/business/restaurants"
					>Your Restaurants</RouterLink
				>
				<RouterLink
					class="business"
					to="/business/addRestaurant"
					>Add Restaurant</RouterLink
				>
			</nav>
		</header>

		<sub-view>
			<RouterView :profile="user.profile" />
		</sub-view>
	</profile-view>
</template>

<style lang="scss" scoped>
	profile-view {
		display: grid;
		gap: 20px;
	}
</style>
