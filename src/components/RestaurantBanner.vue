<script setup>
	import FavoriteButton from "./FavoriteButton.vue";

	const props = defineProps(["restaurant"]);
	const showInfo = ref(false);
</script>

<template>
	<restaurant-banner>
		<text-content>
			<h2 class="loud-voice">
				<span>
					{{ restaurant.name }}
				</span>

				<Skeleton />
			</h2>
			<p class="whisper-voice">
				<span>{{ restaurant.description }}</span>
				<Skeleton />
			</p>
			<p>
				<Skeleton />
				<span v-if="restaurant.ratings">
					★ {{ restaurant.ratings ?? 4.7 }}
				</span>

				<span v-if="restaurant.reviews">
					· ({{ restaurant.reviews ?? 170 }} reviews) ·
				</span>

				<span v-if="restaurant.priceLevel">
					{{ "$".repeat(restaurant.priceLevel ?? 2) }} ·
				</span>
				<button
					class="text"
					@click="showInfo = !showInfo"
				>
					More Info
				</button>
			</p>

			<Teleport to="body">
				<RestaurantInfo
					:restaurant="restaurant"
					:show="showInfo"
					@toggle="showInfo = !showInfo"
				/>
			</Teleport>
			<FavoriteButton :restaurant="restaurant" />
		</text-content>
		<picture>
			<img
				:src="
					restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
			<Skeleton />
		</picture>
	</restaurant-banner>
</template>

<style lang="scss" scoped>
	restaurant-banner {
		display: grid;
		grid-template-columns: 1fr 0.2fr;
		gap: 30px;
		picture {
			grid-row: span 2;
		}
	}
	restaurant-banner picture {
		aspect-ratio: 1 / 1;
	}
	restaurant-banner text-content {
		display: grid;
		gap: 5px;
		justify-content: start;
	}
</style>
