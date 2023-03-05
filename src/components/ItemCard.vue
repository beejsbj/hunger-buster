
<script setup>
	import { useRouter } from "vue-router";
	const router = useRouter();
	const props = defineProps(["item"]);

	function redirect() {
		router.push({
			path: "/restaurant/" + props.item.slug,
		});
	}
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
		<p>${{ item.price }}</p>

		<div class="buttons">
			<button
				class="button"
				@click="item.show = !item.show"
			>
				Quick Add
			</button>
			<button
				class="button"
				@click="redirect()"
			>
				Detail page
			</button>
		</div>
	</item-card>
	<ItemModal :item="item" />
</template>

<style scoped>
	item-card div {
		display: flex;
		justify-content: space-between;
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