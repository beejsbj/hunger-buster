<script setup>
	import { onMounted } from "vue";

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
				<RouterLink to="/user/dashboard">Dashboard</RouterLink>
				<RouterLink to="/user/about">About</RouterLink>
				<RouterLink
					v-if="
						user.profile?.favoriteRestaurants.length ||
						user.profile?.favoriteItems.length
					"
					to="/user/favorites"
				>
					Favorties
				</RouterLink>
				<RouterLink to="/user/orders">Orders</RouterLink>
				<!-- <RouterLink to="/user/reviews">Reviews</RouterLink>
				<RouterLink to="/user/settings">Settings</RouterLink> -->
				<RouterLink
					v-if="user.isBusinessOwner"
					class="business"
					to="/business"
					>Business</RouterLink
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
