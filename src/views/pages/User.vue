<script setup>
	import { useUserStore } from "@/stores/user.js";
	const user = useUserStore();
</script>

<template>
	<section>
		<Login
			:user="user"
			v-if="!user.current"
		/>

		<Profile v-if="user.current" />
	</section>
</template>
<style scoped></style>
