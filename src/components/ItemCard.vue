<script setup>
	import { useRouter } from "vue-router";

	const router = useRouter();
	const props = defineProps(["item"]);
	const ui = useInterfaceStore();

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
				v-show="!ui.seletonLoading"
			/>
			<Skeleton
				:pill="true"
				duration="2000"
			/>
		</picture>
		<text-content>
			<Skeleton :pill="true" />
			<h4 class="firm-voice">
				{{ item.name }}
			</h4>
			<p>${{ item.price }}</p></text-content
		>

		<div class="buttons">
			<Skeleton :pill="true" />
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
	<Teleport to="body">
		<ItemModal :item="item" />
	</Teleport>
</template>

<style scoped>
	item-card {
		display: grid;
		gap: 10px;
		height: 100%;
	}
	item-card div {
		align-items: center;
		justify-content: space-between;
	}
	item-card picture {
		aspect-ratio: 1 / 1;
	}

	item-card picture img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}

	item-card text-content {
		display: grid;
		gap: 10px;
		/* padding: 0 10px; */
	}
</style>
