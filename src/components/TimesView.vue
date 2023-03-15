<script setup>
	const props = defineProps(["times"]);
</script>

<template>
	<opening-times>
		<h1 class="firm-voice">Opening Times</h1>

		<ul class="restaurant-times">
			<li
				v-for="(dayObj, day) in times"
				:key="day"
			>
				<h2 class="whisper-voice">{{ day }}</h2>
				<p
					v-if="dayObj.closed"
					class="small-voice"
				>
					Closed
				</p>
				<p
					class="small-voice"
					v-else
				>
					{{ dayObj.opening }} - {{ dayObj.closing }}
				</p>
			</li>
		</ul>
	</opening-times>
</template>

<style scoped>
	opening-times {
		display: grid;
		gap: 10px;
	}
	ul.restaurant-times {
		display: grid;
		gap: 2px;
	}

	ul.restaurant-times li {
		display: grid;
		grid-template-columns: 0.4fr 1fr;
	}
</style>
