<script setup>
	import { reactive } from "vue";
	import { useFirebaseAuth } from "vuefire";

	const auth = useFirebaseAuth();
	const user = useUserStore();

	const loginForm = reactive({
		email: "",
		password: "",
	});

	const viewLoginPassword = ref(false);
</script>

<template>
	<login-form>
		<h1 class="loud-voice">Welcome Back Hungry!</h1>

		<form>
			<h2 class="solid-voice">Business Login</h2>
			<input-field>
				<input
					required
					id="login-email"
					v-model="loginForm.email"
					type="text"
				/>
				<label for="login-email">Enter Email</label>
			</input-field>
			<input-field>
				<input
					required
					id="login-password"
					v-model="loginForm.password"
					:type="viewLoginPassword ? 'text' : 'password'"
				/>
				<label for="login-password">Enter Password</label>
			</input-field>

			<div class="buttons">
				<button
					class="button"
					@click.prevent="user.businessLogin(loginForm)"
				>
					Login
				</button>
				<button
					class="button"
					@click.prevent="viewLoginPassword = !viewLoginPassword"
				>
					<span v-if="!viewLoginPassword">Show Password</span>
					<span v-if="viewLoginPassword">View Password</span>
				</button>
			</div>
			<RouterLink to="/business-signup">New? Create an account.</RouterLink>
		</form>
	</login-form>
</template>

<style scoped>
</style>
