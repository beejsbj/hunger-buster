<script setup>
	import { reactive } from "vue";
	import { useFirebaseAuth } from "vuefire";

	const auth = useFirebaseAuth();

	const signupForm = reactive({
		displayName: "",
		email: "",
		password: "",
	});

	const loginForm = reactive({
		email: "",
		password: "",
	});

	defineProps({
		user: Object,
	});

	const viewPassword = ref(false);
</script>

<template>
	<login-form>
		<h1 class="loud-voice">Hi Hungry!</h1>
		<button @click="viewPassword = !viewPassword">View Password</button>
		<form>
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
					:type="viewPassword ? 'text' : 'password'"
				/>
				<label for="login-password">Enter Password</label>
			</input-field>

			<button @click.prevent="user.login(loginForm)">Login</button>
		</form>
		<h2 class="attention-voice">OR</h2>
		<form>
			<input-field>
				<input
					required
					id="displayName"
					v-model="signupForm.displayName"
					type="text"
				/>
				<label for="displayName">Enter Name</label>
			</input-field>
			<input-field>
				<input
					required
					id="signup-email"
					v-model="signupForm.email"
					type="text"
				/>
				<label for="signup-email">Enter Email</label>
			</input-field>
			<input-field>
				<input
					required
					id="signup-password"
					v-model="signupForm.password"
					:type="viewPassword ? 'text' : 'password'"
				/>
				<label for="signup-password">Enter Password</label>
			</input-field>

			<button @click.prevent="user.signUp(signupForm)">Sign Up</button>
		</form>
	</login-form>
</template>

<style>
	login-form {
		display: grid;
		gap: 30px;
	}
	login-form h2 {
		background: var(--color);
		text-align: center;
	}
	login-form button {
		justify-self: start;
	}
</style>
