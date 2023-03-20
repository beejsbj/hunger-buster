<script setup>
	import { Skeletor } from "vue-skeletor";
	const ui = useInterfaceStore();
	const props = defineProps(["pill", "duration"]);

	const duration = computed(() => {
		return props.duration ?? 1000;
	});

	const seletonLoading = ref(true);
	onMounted(() => {
		seletonLoading.value = true;

		setTimeout(() => {
			seletonLoading.value = false;
		}, duration.value);
	});
</script>

<template>
	<Skeletor
		v-if="seletonLoading"
		size="100%"
		:pill="pill"
	/>
</template>

<style lang="scss">
	* {
		&:has(> .vue-skeletor) {
			position: relative;
			& > :not(.vue-skeletor) {
				opacity: 0;
			}
		}
		& > .vue-skeletor {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 11;
			background-color: hsla(0, 0%, 80%, 1);
		}
	}
</style>
