<script setup>
	import { reactive } from "vue";
	import { useFirebaseAuth } from "vuefire";

	const auth = useFirebaseAuth();
	const user = useUserStore();

	const signupForm = reactive({
		displayName: "",
		email: "",
		password: "",
	});

	const viewSignupPassword = ref(false);
</script>

<template>
	<login-form>
		<h1 class="loud-voice">Help Hungry People!</h1>

		<form>
			<h2 class="solid-voice">Business Signup</h2>

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
					:type="viewSignupPassword ? 'text' : 'password'"
				/>
				<label for="signup-password">Enter Password</label>
			</input-field>

			<div class="buttons">
				<button
					class="button"
					@click.prevent="user.businessSignUp(signupForm)"
				>
					Sign Up
				</button>
				<button
					class="button"
					@click.prevent="viewSignupPassword = !viewSignupPassword"
				>
					<span v-if="!viewSignupPassword">Show Password</span>
					<span v-if="viewSignupPassword">View Password</span>
				</button>
			</div>
			<RouterLink to="/business-login">Have an account? Login.</RouterLink>
		</form>
	</login-form>
</template>

<style scoped>
</style>
