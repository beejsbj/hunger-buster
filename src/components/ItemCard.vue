<script setup>
	import { useRouter } from "vue-router";
	import FavoriteButton from "./FavoriteButton.vue";

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
			/>
			<Skeleton duration="2000" />
		</picture>
		<text-content>
			<Skeleton />
			<h4 class="firm-voice">
				{{ item.name }}
			</h4>
			<p>${{ item.price }}</p>
		</text-content>

		<div class="buttons">
			<Skeleton />
			<button
				class="button"
				@click="item.show = !item.show"
			>
				Add
			</button>
			<button
				class="button outline"
				@click="redirect()"
			>
				More
			</button>
		</div>
		<FavoriteButton :item="item" />
	</item-card>
	<Teleport to="body">
		<ItemModal :item="item" />
	</Teleport>
</template>

<style lang="scss" scoped>
	item-card {
		display: grid;
		gap: 10px;
		height: 100%;
	}
	@media (max-width: 450px) {
		item-card {
			grid-template-columns: 0.2fr 1fr;
		}
		item-card picture {
			grid-row: span 2;
		}
	}

	item-card div {
		align-items: center;
		justify-content: space-between;
	}
	item-card picture {
		aspect-ratio: 1 / 1;
		border-radius: var(--corners);
		overflow: hidden;
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

	item-card {
		position: relative;

		button.favorite {
			position: absolute;
			top: 0px;
			right: 0px;

			width: 35px;
			height: 35px;
			border-radius: 50%;

			padding-top: 6px;

			@media (min-width: 450px) {
				top: 10px;
				right: 10px;
				box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
			}
		}
	}
</style>
