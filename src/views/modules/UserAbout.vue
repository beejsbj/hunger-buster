<script setup>
defineProps(["profile"])
</script>


<template>
	<h1 class="loud-voice">About me</h1>
	<p>{{profile?.description}}</p>
</template>
