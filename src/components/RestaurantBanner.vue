<script setup>
	const props = defineProps(["restaurant"]);
	const showInfo = ref(false);
</script>


<template>
	<restaurant-banner>
		<text-content>
			<h2 class="loud-voice">
				{{ restaurant.name }}
			</h2>
			<p>
				★
				<span v-if="restaurant.ratings">{{ restaurant.ratings }}</span>
				(<span v-if="restaurant.reviews">{{ restaurant.reviews }}</span
				>+ reviews) · {{ "$".repeat(restaurant.priceLevel) }} ·
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
		</text-content>
		<picture>
			<img
				:src="
					restaurant.image ?? 'https://peprojects.dev/images/square.jpg'
				"
				alt="https://peprojects.dev/images/square.jpg"
			/>
		</picture>
	</restaurant-banner>
</template>

<style lang="scss" scoped>
	restaurant-banner {
		display: grid;
		grid-template-columns: 1fr 0.2fr;
		picture {
			grid-row: span 2;
		}
	}
</style>