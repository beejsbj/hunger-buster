<script setup>
	import Profile from "../modules/Profile.vue";
	import SignUp from "../modules/SignUp.vue";

	import { useUserStore } from "../../stores/user.js";
	import { RouterLink, RouterView, useRoute } from "vue-router";
	const user = useUserStore();
</script>

<template>
	<SignUp
		:user="user"
		v-if="!user.current"
	/>

	<Profile v-if="user.current" />

	{{ user.current }}
</template>
<style scoped></style>
