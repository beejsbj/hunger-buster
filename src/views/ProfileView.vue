<script setup>
	import Profile from "../components/Profile.vue";
	import SignUp from "../components/SignUp.vue";

	import { useUserStore } from "../stores/user.js";
	import { RouterLink, RouterView, useRoute } from "vue-router";
	const user = useUserStore();
</script>

<template>
	<SignUp
		:user="user"
		v-if="!user.current"
	/>

	<Profile
		v-if="user.current"
		:user="user.current"
	/>
</template>
<style scoped></style>
