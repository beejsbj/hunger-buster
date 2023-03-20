<script setup>
	import { onUpdated } from "vue";

	///////////////////////////////////////////
	const shop = useShopStore();
	const user = useUserStore();
	const ui = useInterfaceStore();

	//
	const navRef = ref(null);

	onMounted(() => {
		ui.navUnderline({
			target: navRef.value.querySelector("a.router-link-active"),
		});
	});

	// watch(
	// 	shop.restaurant,
	// 	() => {
	// 		console.log("watching shop.colors", shop.colors);
	// 		let $body = document.querySelector("body");
	// 		if (shop.colors[5]) {
	// 			$body.style.setProperty("--highlight", shop.colors[5]);
	// 		}
	// 	},
	// 	{ deep: true }
	// );
</script>

<template>
	<header class="restaurant">
		<nav
			class="restaurant-menu"
			@click="ui.navUnderline($event)"
			ref="navRef"
		>
			<Skeleton :pill="true" />
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

			<template
				v-if="
					user.isAdmin ||
					(user.isBusinessOwner && user.id === shop.restaurant.owner)
				"
			>
				<RouterLink
					class="business"
					:to="'/restaurant/' + shop.restaurant.id + '/createItem'"
					>Add Item</RouterLink
				>
				<!-- #todo Edit Categories</RouterLink > -->
				<RouterLink
					class="business"
					:to="'/restaurant/' + shop.restaurant.id + '/admin'"
					>Administator</RouterLink
				>
			</template>
		</nav>
	</header>
</template>
<style lang="scss" scoped>
	header {
		display: grid;
		gap: 20px;

		nav {
			align-content: start;

			@media (max-width: 450px) {
				font-size: clamp(14px, 1.5vw, 1em);
				gap: 0px;
				justify-content: space-between;
				flex-wrap: nowrap;
			}

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
</style>
