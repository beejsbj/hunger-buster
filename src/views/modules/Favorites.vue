<script setup>
	defineProps(["profile"]);
</script>
<template>
	<article>
		<favorites-module v-if="profile?.favoriteRestaurants">
			<h2 class="attention-voice">Favorite Restaurants</h2>
			<ul class="restaurant-list">
				<li
					:key="restaurant.id"
					v-for="restaurant in profile.favoriteRestaurants"
				>
					<RestaurantCard :restaurant="restaurant" />
				</li>
			</ul>
		</favorites-module>

		<favorites-module v-if="profile?.favoriteItems">
			<h2 class="attention-voice">Favorite Items</h2>
			<ul class="items-list">
				<li :key="item.id" v-for="item in profile.favoriteItems">
					<ItemCard :item="item" />
				</li>
			</ul>
		</favorites-module>
	</article>
</template>

<style scoped>
	article {
		display: grid;
		gap: 40px;
	}
	favorites-module {
		display: grid;
		gap: 20px;
	}
</style>