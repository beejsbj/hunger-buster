<template>
	<footer>
		<inner-column>
			<footer-menu>
				<nav>
					<RouterLink to="/">Home</RouterLink>
					<RouterLink to="/restaurants">Restaurants</RouterLink>
					<RouterLink to="/user">Profile</RouterLink>
					<RouterLink to="/login">Login</RouterLink>
				</nav>
				<nav>
					<RouterLink to="/about">About</RouterLink>

					<RouterLink to="/contact">Contact</RouterLink>
					<RouterLink to="/feedback">Feedback</RouterLink>
				</nav>
				<nav>
					<RouterLink to="/faq">FAQ</RouterLink>
					<RouterLink to="/support">Support</RouterLink>
					<RouterLink to="/privacy">Privacy</RouterLink>
					<RouterLink to="/terms">Terms</RouterLink>
				</nav>
				<nav>
					<RouterLink to="/business-signup">Business Signup</RouterLink>
					<RouterLink to="/business">Your Restaurants</RouterLink>
					<RouterLink to="/business/add-restaurant"
						>Add Restaurant</RouterLink
					>
					<a
						target="site"
						href="https://burooj.dev"
					>
						Visit Website
					</a>
					<a
						href="https://github.com/beejsbj/hunger-buster"
						target="github"
					>
						Github Source Code
					</a>
				</nav>
			</footer-menu>
		</inner-column>
		<BackgroundDecor />
	</footer>
</template>

<style lang="scss" scoped>
	footer {
		position: relative;

		background: var(--color);
		background-image: url("@/assets/images/pizza.jpg");
		background-size: 15%;

		inner-column {
			display: grid;
			gap: 20px;
			z-index: 3;
			position: relative;

			background: hsla(60, 95%, 50%, 0.9);
		}
	}
	footer-menu {
		display: grid;
		justify-content: space-between;
		gap: 30px;
		grid-template-columns: repeat(2, 1fr);

		@media (min-width: 500px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	footer-menu nav {
		display: grid;
		gap: 5px;
		align-content: start;
		justify-content: start;
	}
	footer-menu nav a {
		--ink: black;
		color: var(--ink);
	}
</style>
