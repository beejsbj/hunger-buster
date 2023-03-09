<script setup>
	const user = useUserStore();
	const ui = useInterfaceStore();

	const navRef = ref(null);

	watch(navRef, (newVal) => {
		ui.navUnderline({
			target: newVal.querySelector("a.router-link-active"),
		});
	});
</script>

<template>
	<profile-view>
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

		<ProfileBanner :profile="user.profile" />

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
