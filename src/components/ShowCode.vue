<script setup>
	defineProps(["code"]);
</script>

<template>
	<pre>
		<code>
{{ code }} 
		</code>
	</pre>
</template>

<style>
	scoped pre {
		border: 1px solid green;
	}
</style>