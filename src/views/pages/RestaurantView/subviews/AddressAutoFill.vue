<script setup>
	const user = useUserStore();
</script>

<template>
	<div class="gmap-auto-complete">
		<GMapAutocomplete
			id="delivery-address"
			@place_changed="user.setUserLocation"
			:value="user.address?.formatted_address ?? 'Enter your address'"
		/>
		<Skeleton :pill="true" />
	</div>
</template>

<style scoped>
	div.gmap-auto-complete {
		align-self: center;
		grid-column: 1 / -1;
		display: grid;
	}
</style>
