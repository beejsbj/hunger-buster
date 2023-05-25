<script setup>
	const user = useUserStore();
</script>

<template>
	<div class="gmap-auto-complete">
		<GMapAutocomplete
			id="delivery-address"
			@place_changed="user.setUserLocation"
			:placeholder="'📍 Enter your address'"
			:value="user.address?.formatted_address"
		/>

		<Skeleton />
	</div>
</template>

<style scoped lang="scss">
	div.gmap-auto-complete {
		position: relative;
		align-self: center;
		/* grid-column: 1 / -1; */
		display: grid;
		width: 25%;
		transition: 0.2s;
		input {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		&:has(input:focus) {
			width: 100%;
		}
		left: 30px;
		&::before {
			content: "";

			position: absolute;
			color: var(--paper);
			left: -30px;
			top: 50%;
			transform: translateY(-50%);
			background-color: var(--color);
			width: 30px;
			height: 101%;
			border-top-left-radius: var(--corners);
			border-bottom-left-radius: var(--corners);

			background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/1200px-Map_marker_font_awesome.svg.png");
			background-position: left center;
			background-size: 45%;
		}
	}
</style>
