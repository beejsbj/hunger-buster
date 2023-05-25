<script setup>
	const user = useUserStore();
</script>

<template>
	<landing-page v-if="user.auth && !user.address">
		<RouterLink
			class="position-button button text attention-voice"
			to="login"
			v-if="!user.current"
			>Sign In</RouterLink
		>
		<div class="heading">
			<h1 class="booming-voice">HUNGER <span>BUSTER</span></h1>
		</div>
		<div class="address">
			<div>
				<h1 class="attention-voice">Get Food to You</h1>
				<AddressAutoFill />
			</div>
		</div>
	</landing-page>
</template>

<style lang="scss" scoped>
	landing-page {
		position: fixed;
		top: 0;
		left: 0;
		display: grid;
		height: 100vh;
		width: 100vw;
		grid-template-rows: 0.4fr 1fr;
		z-index: 5;

		@media (min-width: 600px) {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: initial;
		}
	}

	.heading {
		background-color: var(--color);
		display: grid;

		align-items: center;
		padding: 30px;
		text-align: center;

		span {
			color: black;
		}
	}
	.address {
		background-color: black;
		display: grid;
		color: white;

		align-items: center;
		padding: 30px;

		& > * {
			width: 100%;

			margin: 0 auto;
			display: grid;
			gap: 20px;

			@media (min-width: 600px) {
				max-width: 30vw;
			}
		}
	}

	.position-button {
		position: absolute;
		top: 20px;
		right: 20px;
	}
</style>
