<script setup>
	import RestaurantItemView from "../views/RestaurantItemView.vue";

	import { useRoute, useRouter } from "vue-router";

	import { useShopStore } from "../stores/shop.js";

	const route = useRoute();
	const router = useRouter();
	const shop = useShopStore();

	const restaurant = shop.restaurants.find(function (restaurant) {
		return (
			route.params.restaurantSlug == restaurant.id ||
			route.params.restaurantSlug == restaurant.slug
		);
	});
</script>
<template>
	<restaurant-card>
		<menu-items>
			<ul>
				<li v-for="item in restaurant.menuItems">
					<item-card>
						<h4>{{ item.name }}</h4>
						<picture>
							<img
								:src="
									item.image ??
									'https://peprojects.dev/images/square.jpg'
								"
								alt="https://peprojects.dev/images/square.jpg"
							/>
						</picture>

						<p>${{ item.price }}</p>
						<!-- <RouterLink
							:to="`/restaurant/${restaurant.slug}/${item.slug}`"
							>MORE</RouterLink
						> -->

						<button @click="item.show = !item.show">MORE</button>
					</item-card>
					<Transition
						@after-enter="onAfterEnter"
						name="fade"
					>
						<item-wrapper
							v-if="item.show"
							@click.self="item.show = !item.show"
						>
							<RestaurantItemView :item="item" />
						</item-wrapper>
					</Transition>
				</li>
			</ul>
		</menu-items>
	</restaurant-card>
</template>
<style scoped>
	restaurant-card {
		display: grid;
		gap: 5px;
	}
	restaurant-card div {
		display: flex;
		justify-content: space-between;
	}

	item-card {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
	}
	a {
		color: salmon;
	}

	item-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: hsla(212, 23%, 11%, 0.6);
		overflow-x: hidden;
		padding: 100px;
	}

	item-detail {
		padding: 20px;
		background: var(--paper);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
