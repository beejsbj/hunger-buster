<script setup>
	import { reactive } from "vue";
	import { useFirebaseAuth } from "vuefire";

	const auth = useFirebaseAuth();

	const form = reactive({
		email: "",
		password: "",
	});

	defineProps({
		user: Object,
	});
</script>

<template>
	<login-form>
		<h1 class="loud-voice">Hi Hungry!</h1>
		<form>
			<input-field>
				<input
					id="email"
					v-model="form.email"
					type="text"
				/>
				<label for="email">Enter Email</label>
			</input-field>
			<input-field>
				<input
					id="password"
					v-model="form.password"
					type="text"
				/>
				<label for="password">Enter Password</label>
			</input-field>
			<div class="buttons">
				<button @click.prevent="user.signUp(form)">Sign Up</button>
				<button @click.prevent="user.login(form)">Login</button>
			</div>
		</form>
	</login-form>
</template>

<style>
	.buttons {
		padding: 10px;
		display: flex;
		gap: 10px;
	}
	login-form {
		display: grid;
		gap: 20px;
	}
</style>
