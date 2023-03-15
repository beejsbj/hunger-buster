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
				<GMapMap
					:center="restaurant.address.location"
					:zoom="14"
					:draggable="false"
					map-type-id="terrain"
					style=""
					@click="window.href(restaurant.address.url)"
				>
					<GMapCluster>
						<GMapMarker
							:position="restaurant.address.location"
							:clickable="true"
							:draggable="false"
						/>
					</GMapCluster>
				</GMapMap>
				<text-content>
					<h2 class="attention-voice">
						{{ restaurant.name }}
					</h2>

					<paragraph-content>
						<p v-if="restaurant.phone">
							{{ restaurant.phone }}
						</p>
						<p v-if="restaurant.address">
							{{ restaurant.address.formatted_address }}
						</p>
						<p v-if="restaurant.website">
							<a
								:target="restaurant.id"
								:href="`//${restaurant.website}`"
								>{{ restaurant.name }}</a
							>
						</p>
						<TimesView
							v-if="restaurant.times"
							:times="restaurant.times"
						/>
					</paragraph-content>
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
		width: clamp(300px, 90vw, 500px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		background-color: var(--paper);

		display: grid;
		grid-template-rows: 1fr 0.1fr;
	}
	info-box text-content {
		padding: 10px;
		display: grid;
		gap: 20px;
	}

	.vue-map {
		width: 100%;
		height: 100%;
	}

	paragraph-content {
		display: grid;
		gap: 5px;
	}
</style>
