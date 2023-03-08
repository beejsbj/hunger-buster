<script setup>
	import { useUserStore } from "@/stores/user.js";
	const user = useUserStore();
</script>

<template>
	<Profile v-if="user.current" />
</template>
<style scoped></style>
