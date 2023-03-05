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
				<RouterLink to="/user/orders">Orders</RouterLink>

				<template v-if="user.isBusinessOwner">
					<RouterLink
						class="business"
						to="/user/restaurants"
						>Your Restaurants</RouterLink
					>
					<RouterLink
						class="business"
						to="/user/addRestaurant"
						>Add Restaurant</RouterLink
					>
				</template>
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
