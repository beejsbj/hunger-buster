<script setup>
	///////////////////////////////////////////
	const route = useRoute();
</script>

<template>
	<header class="business">
		<nav>
			<RouterLink to="/business/about">About</RouterLink>
			<RouterLink to="/business/addRestaurant">Add Restaurant</RouterLink>
		</nav>
	</header>

	<business-banner>
		<h1 class="loud-voice">Buisness page</h1>
	</business-banner>

	<sub-view>
		<RouterView v-slot="{ Component, route }">
			<!-- route.meta.transition -->
			<Transition mode="out-in" appear name="fade">
				<Component :is="Component" :key="route.name" />
			</Transition>
		</RouterView>
	</sub-view>
</template>