<script setup>
	const props = defineProps(["times"]);
</script>

<template>
	<ul class="restaurant-times">
		<li
			v-for="(dayObj, day) in times"
			:key="day"
		>
			<h2 class="whisper-voice">{{ day }}</h2>
			<p v-if="dayObj.closed">Closed</p>
			<p
				class="small-voice"
				v-else
			>
				{{ dayObj.opening }} - {{ dayObj.closing }}
			</p>
		</li>
	</ul>
</template>

<style scoped>
	ul.restaurant-times {
		display: grid;
		gap: 5px;
	}
</style>
