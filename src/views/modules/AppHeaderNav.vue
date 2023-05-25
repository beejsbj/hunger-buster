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
			key="skeleton"
			v-if="!ui.isMobile"
		/>
		<RouterLink
			key="restaurants"
			to="/restaurants"
			class="text"
		>
			Restaurants
		</RouterLink>
		<RouterLink
			key="carts"
			v-if="shop.carts?.length && false"
			to="/carts"
			class="text cart"
			>Carts</RouterLink
		>
		<RouterLink
			key="user"
			to="/user"
			class="text"
			v-if="user.current"
		>
			Profile
		</RouterLink>
		<RouterLink
			key="login"
			to="/login"
			class="button"
			v-if="!user.current"
		>
			Login
		</RouterLink>

		<button
			class="button logout"
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
		gap: 2rem;
		// transition: 0.2s;
		// padding: 20px;
		@media (min-width: 450px) {
			display: flex;
		}

		--left: 0;
		--width: 0;
		transition: 0.2s;
		position: relative;

		&::after {
			content: "";
			position: absolute;
			bottom: -10px;
			height: 5px;
			left: var(--left);
			width: var(--width);
			background-color: var(--underline-color);
			border-radius: var(--corners);
			transition: 0.2s;
		}
	}
</style>
