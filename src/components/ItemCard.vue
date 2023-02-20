
<script setup>
	const props = defineProps(["item"]);
	const user = useUserStore();
	
</script>

<template>
	<item-card>
		<picture>
			<img
				:src="item.image ?? 'https://peprojects.dev/images/square.jpg'"
				alt="https://peprojects.dev/images/square.jpg"
			/>
		</picture>
		<h4 class="solid-voice">{{ item.name }}</h4>

		<div>
			<p>${{ item.price }}</p>

			<button @click="item.show = !item.show">MORE</button>
		</div>
	</item-card>
</template>

<style scoped>
	item-card div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 0;
	}

	item-card {
		display: grid;
		gap: 10px;
		background-color: rgba(0, 0, 0, 0.1);
	}
	item-card picture img {
		aspect-ratio: 1 / 1;
		object-fit: cover;
	}
</style>