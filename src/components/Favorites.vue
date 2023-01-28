<script setup>
	import { useUserStore } from "../stores/user.js";
	const user = useUserStore();
</script>
<favorites-module>
			<h2 class="attention-voice">Fav Rests</h2>
			<ul class="favorites">
				<li v-for="restaurant in user.profile.favoriteRestaurants">
					{{ restaurant.name }}
				</li>
			</ul>
		</favorites-module>
