<script setup>
	defineProps(["profile"]);
</script>
<template>
	<favorites-list>
		<favorites-module v-if="profile?.favoriteRestaurants.length">
			<h2 class="attention-voice">Favorite Restaurants</h2>
			<TransitionGroup
				name="list"
				tag="ul"
				class="restaurant-list"
			>
				<li
					:key="restaurant.id"
					v-for="restaurant in profile.favoriteRestaurants"
				>
					<RestaurantCard :restaurant="restaurant" />
				</li>
			</TransitionGroup>
		</favorites-module>

		<favorites-module v-if="profile?.favoriteItems.length">
			<h2 class="attention-voice">Favorite Items</h2>
			<TransitionGroup
				name="list"
				tag="ul"
				class="items-list"
			>
				<li
					:key="item.id"
					v-for="item in profile.favoriteItems"
				>
					<ItemCard :item="item" />
				</li>
			</TransitionGroup>
		</favorites-module>
	</favorites-list>
</template>

<style lang="scss" scoped>
	favorites-list {
		display: grid;
		gap: 40px;
	}
	favorites-module {
		display: grid;
		gap: 20px;
	}

	ul.restaurant-list {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

		gap: 30px;

		@media (min-width: 450px) {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		}
	}

	.items-list {
		display: grid;
		gap: 20px;

		@media (min-width: 450px) {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		}
	}
</style>
