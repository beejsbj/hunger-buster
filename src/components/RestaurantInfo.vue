
<script setup>
	defineProps(["restaurant", "show"]);
</script>
<template>
	<Transition name="modal">
		<div
			class="modal-mask"
			@click.self="$emit('toggle')"
			v-if="show"
		>
			<info-box>
				<map-box> MAP </map-box>
				<text-content>
					<h2 class="loud-voice">
						{{ restaurant.name }}
					</h2>

					<p v-if="restaurant.phone">
						{{ restaurant.phone }}
					</p>
					<p v-if="restaurant.address">
						{{ restaurant.address }}, {{ restaurant.city }},
						{{ restaurant.state }}, {{ restaurant.zip }}
					</p>
					<p v-if="restaurant.website">
						<a
							:target="restaurant.id"
							:href="`//${restaurant.website}`"
							>{{ restaurant.website }}</a
						>
					</p>
					<p v-if="restaurant.hours">
						{{ restaurant.hours }}
					</p>
				</text-content>
			</info-box>
		</div>
	</Transition>
</template>

<style scoped>
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		transition: opacity 0.3s ease;
	}
	info-box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		background-color: var(--paper);
	}
	info-box text-content {
		padding: 10px;
	}
</style>