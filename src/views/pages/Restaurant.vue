<script setup>
	///////////////////////////////////////////
	const shop = useShopStore();
	const route = useRoute();

	const user = useUserStore();
	const ui = useInterfaceStore();

	//
	const navRef = ref(null);

	watch(navRef, (newVal) => {
		ui.navUnderline({
			target: newVal.querySelector("a.router-link-active"),
		});
	});
</script>

<template>
	<article v-if="shop.restaurant">
		<RestaurantBanner :restaurant="shop.restaurant" />
		<header class="restaurant">
			<nav
				class="restaurant-menu"
				@click="ui.navUnderline($event)"
				ref="navRef"
			>
				<RouterLink :to="'/restaurant/' + shop.restaurant.id">
					Items
				</RouterLink>
				<RouterLink
					:to="'/restaurant/' + shop.restaurant.id + '/cart'"
					class="cart"
				>
					Cart
					<span :class="{ cartCount: shop.cartCount }">
						<span>
							{{ shop.cartCount }}
						</span>
					</span>
				</RouterLink>
				<RouterLink
					v-if="user.isBusinessOwner"
					class="business"
					:to="'/restaurant/' + shop.restaurant.id + '/createItem'"
					>Add Item</RouterLink
				>
				<!-- <RouterLink
				v-if="user.isBusinessOwner"
				:to="'/restaurant/' + shop.restaurant.id + '/createItem'"
				>#todo Edit Categories</RouterLink 
			> -->
				<RouterLink
					v-if="user.isAdmin || user.isBusinessOwner"
					class="business"
					:to="'/restaurant/' + shop.restaurant.id + '/admin'"
					>Administator</RouterLink
				>
			</nav>
		</header>
		<sub-view>
			<RouterView
				:restaurant="shop.restaurant"
				:cart="shop.cart"
			/>
			<!-- <RouterView
				:restaurant="shop.restaurant"
				:cart="shop.cart"
				v-slot="{ Component, route }"
			>
				#todo add transition
				<Transition
					mode="out-in"
					appear
					name="fade"
				>
					<Component
						:is="Component"
						:key="route.name"
					/>
				</Transition>
			</RouterView> -->
		</sub-view>
	</article>
</template>

<style lang="scss" scoped>
	header,
	article {
		display: grid;
		gap: 20px;
	}
	sub-view {
		// border: 3px solid blue;
		// overflow-x: hidden;
		// width: 100%;
	}
	header {
		nav {
			align-content: start;
			a {
				&.cart {
					position: relative;

					span {
						display: none;
					}

					.cartCount {
						display: initial;
						/*	vertical-align: super;*/
						background: yellow;
						color: black;
						position: absolute;
						top: -10px;
						right: -5px;
						padding: 10px;
						border-radius: 50%;

						span {
							font-size: 0.9em;
							display: initial;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}
				}
			}
		}
	}

	.slide-to-left-enter-active,
	.slide-to-right-enter-active {
		transition: 0.5s ease-in-out;
		width: 100%;
	}
	.slide-to-left-leave-active,
	.slide-to-right-leave-active {
		transition: 0.5s ease-in-out;
		width: 100%;
		position: absolute;
	}

	.slide-to-right-leave-to,
	.slide-to-left-enter-from {
		transform: translateX(-100%);
		position: absolute;
		// opacity: 0;
	}

	.slide-to-left-leave-to,
	.slide-to-right-enter-from {
		transform: translateX(100%);
		position: absolute;
		// opacity: 0;
	}
</style>
