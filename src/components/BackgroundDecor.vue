<template>
	<Teleport to="body">
		<div class="decoration right background-burgers"></div>
	</Teleport>
	<Teleport to="footer">
		<div class="decoration left background-burgers"></div>
	</Teleport>
</template>

<style scoped>
	.decoration {
		z-index: -1;
		pointer-events: none;

		opacity: 0.15;
		width: 100%;
		position: absolute;
	}
	.decoration.right {
		background: url("@/assets/images/burgers.svg");
		background-size: 60%;
		height: 100vh;
		max-width: 20vw;
		right: -0vmax;
		rotate: 5deg;
	}

	.decoration.left {
		background: url("@/assets/images/burger-texture.svg");
		background-size: 50px;
		top: 0;
		left: 0;
		height: 100%;
		z-index: 2;
	}
</style>
