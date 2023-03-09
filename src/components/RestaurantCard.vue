<script setup>
	const user = useUserStore();
	const props = defineProps(["restaurant"]);
	const found = computed(() =>
		user.profile?.favoriteRestaurants?.find(function (favorite) {
			return favorite.id == props.restaurant.id;
		})
	);
</script>

<template>
	<restaurant-card>
		<picture>
			<img
				:src="
					restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
		</picture>
		<text-content>
			<h2 class="solid-voice">
				{{ restaurant.name }}
			</h2>
			<p class="price-level">{{ "$".repeat(restaurant.priceLevel) }}</p>
		</text-content>
		<div>
			<RouterLink
				class="button outline"
				:to="'/restaurant/' + restaurant.id"
			>
				MORE
			</RouterLink>
			<button
				class="button"
				:class="{ favorite: found ? true : false }"
				@click="user.favoriteRestaurant(restaurant)"
			>
				♡
			</button>
		</div>
	</restaurant-card>
</template>

<style scoped>
	restaurant-card {
		display: grid;
		gap: 10px;
		background-color: rgba(0, 0, 0, 0.1);
		aspect-ratio: 1/1;
	}
	restaurant-card div {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	restaurant-card img {
		object-fit: cover;
		/* object-position: 0 100%; */
		max-height: 100%;
	}

	text-content {
		display: flex;
		justify-content: space-between;
	}

	.price-level {
		color: yellowgreen;
	}
</style>