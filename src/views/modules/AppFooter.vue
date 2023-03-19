<template>
	<footer>
		<inner-column>
			<h2 class="attention-voice">footer</h2>

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
						>Visit Website</a
					>
					<a
						href="https://github.com/beejsbj/hunger-buster"
						target="github"
					>
						Github Source Code
					</a>
				</nav>
			</footer-menu>
		</inner-column>
	</footer>
</template>

<style scoped>
	footer {
		background-color: gray;
		color: white;
		padding: 10px 0;
	}
	footer-menu {
		display: flex;
		justify-content: space-between;
		padding: 20px;
	}
	footer-menu nav {
		display: grid;
		gap: 5px;
		align-content: start;
	}
	footer-menu nav a {
		color: white;
		padding: 5px 0;
	}
</style>
