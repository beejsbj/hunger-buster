<script setup>
	const user = useUserStore();
	const shop = useShopStore();
	const ui = useInterfaceStore();

	// function onAfterEnter(el) {
	// 	console.log("onAfterEnter", el);
	// 	if (el.classList.contains("router-link-active")) {
	// 		ui.navUnderline({
	// 			target: el,
	// 		});
	// 	}
	// }
</script>
<template>
	<TransitionGroup
		name="list"
		tag="nav"
		@click="ui.navUnderline($event)"
		ref="navRef"
	>
		<Skeleton
			:pill="true"
			key="skeleton"
			v-if="!ui.isMobile"
		/>
		<RouterLink
			key="home"
			to="/"
		>
			Home
		</RouterLink>
		<RouterLink
			key="restaurants"
			to="/restaurants"
		>
			Restaurants
		</RouterLink>
		<RouterLink
			key="carts"
			v-if="shop.carts?.length && false"
			to="/carts"
			class="cart"
			>Carts</RouterLink
		>
		<RouterLink
			key="user"
			to="/user"
			v-if="user.current"
		>
			Profile
		</RouterLink>
		<RouterLink
			key="login"
			to="/login"
			v-if="!user.current"
		>
			Login
		</RouterLink>
		<button
			class="button"
			key="logout"
			@click="user.logout()"
			v-if="user.current"
		>
			Logout
		</button>
	</TransitionGroup>
</template>

<style lang="scss" scoped>
	nav {
		display: grid;
		gap: 10px;
		transition: 0.2s;
		padding: 20px;
		@media (min-width: 450px) {
			display: flex;
		}
	}
</style>
