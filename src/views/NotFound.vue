<script>
	var header = [
		navigator.platform,
		navigator.userAgent,
		navigator.appVersion,
		navigator.vendor,
		window.opera,
	];
	const platform = console.log(typeof navigator.platform);
	// var agent = header.join(" ");
	// var os = this.matchItem(agent, os);
	// var browser = this.matchItem(agent, browser);
</script>
<template>
	<h1>NOT FOUND</h1>
	<p>YOu on your {{ platform }}</p>
</template>
