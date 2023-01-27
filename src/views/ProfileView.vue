<script setup>
	import { useUserStore } from "../stores/user.js";
	const user = useUserStore();
</script>

<template>
	<profile-view>
		<header class="profile">
			<nav>
				<RouterLink to="/user/about">About</RouterLink>
				<RouterLink to="/user/favorites">Profile</RouterLink>
			</nav>
		</header>
		<h1 class="loud-voice">
			{{ user.profile.name }}
		</h1>
		<picture>
			<img
				:src="user.profile.image"
				alt=""
			/>
		</picture>

		<favorites-module>
			<h2 class="attention-voice">Fav Rests</h2>
			<ul class="favorites">
				<li v-for="restaurant in user.profile.favoriteRestaurants">
					{{ restaurant.name }}
				</li>
			</ul>
		</favorites-module>
		<favorites-module>
			<h2 class="attention-voice">Fav Items</h2>
			<ul class="favorites">
				<li v-for="item in user.profile.favoriteItems">
					{{ item.name }}
				</li>
			</ul>
		</favorites-module>
	</profile-view>
</template>
<style></style>
