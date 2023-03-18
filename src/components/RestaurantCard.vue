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
			<Skeleton :pill="true" />
		</picture>
		<text-content>
			<h2 class="solid-voice">
				{{ restaurant.name }}
			</h2>
			<p class="price-level">{{ "$".repeat(restaurant.priceLevel) }}</p>
			<Skeleton :pill="true" />
		</text-content>
		<div class="buttons">
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
			<Skeleton :pill="true" />
		</div>
	</restaurant-card>
</template>

<style scoped>
	restaurant-card {
		display: grid;
		gap: 10px;
		background-color: rgba(0, 0, 0, 0.01);
	}
	restaurant-card div.buttons {
		display: grid;
		grid-template-columns: 1fr 0.3fr;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	restaurant-card picture {
		aspect-ratio: 1 / 1;
	}
	restaurant-card img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}

	text-content {
		display: flex;
		justify-content: space-between;
	}

	.price-level {
		color: yellowgreen;
	}
</style>
