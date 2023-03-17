<script setup>
	import { Skeletor } from "vue-skeletor";
	const ui = useInterfaceStore();
	const props = defineProps(["pill"]);
</script>

<template>
	<Skeletor
		v-if="ui.seletonLoading"
		size="100%"
		:pill="pill"
	/>
</template>

<style lang="scss">
	* {
		& > .vue-skeletor {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			z-index: 11;
			background-color: hsla(0, 0%, 76%, 1);
		}
		&:has(> .vue-skeletor) {
			position: relative;
			& > :not(.vue-skeletor) {
				opacity: 0;
			}
		}
	}
</style>
