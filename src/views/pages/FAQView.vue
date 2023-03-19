<template>
	<article>
		<h1 class="loud-voice">FAQ</h1>
		<!-- use detail tag to create an FAQ page for my food delivery app -->
		<details>
			<summary class="firm-voice">What is HungerBuster?</summary>
			<p class="whisper-voice">
				HungerBuster is a food delivery app that allows you to order food
				from local restaurants and have it delivered to your door.
			</p>
		</details>
		<details>
			<summary class="firm-voice">How do I order food?</summary>
			<p class="whisper-voice">
				You can order food by searching for a restaurant or by browsing
				through the categories. Once you have found a restaurant you like,
				you can add items to your cart and checkout.
			</p>
		</details>
		<details>
			<summary class="firm-voice">How do I pay for my order?</summary>
			<p class="whisper-voice">
				We accept all major credit cards and debit cards. We also accept
				cash on delivery.
			</p>
		</details>
		<details>
			<summary class="firm-voice">
				How long will it take to get my food?
			</summary>
			<p class="whisper-voice">
				We try to deliver your food as quickly as possible. However, due to
				traffic and other factors, delivery times may vary.
			</p>
		</details>
		<details>
			<summary class="firm-voice">
				What if I have a problem with my order?
			</summary>
			<p class="whisper-voice">
				Please contact us if you have any questions or concerns. You can
				also contact us by phone at
				<a href="tel:1234567890">123-456-7890</a>
			</p>
			<p class="whisper-voice">
				You can also contact us by email at
				<a href="mailto:burooj.bj+hungerbuster@gmail.com"> Email </a>
			</p>
		</details>
	</article>
</template>

<style scoped>
	summary {
		font-weight: bold;
	}
	details p {
		padding: 10px;
	}
</style>
