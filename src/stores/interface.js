import { ref, computed, onUpdated } from "vue";
import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";

export const useInterfaceStore = defineStore("interface", function () {
	const shop = useShopStore();
	const user = useUserStore();

	const mainMenuOpen = ref(false);
	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
	}

	const isMobile = computed(() => {
		return window.innerWidth < 450;
	});

	function loader() {
		const loader = useLoading().show({
			// Optional parameters
		});

		setTimeout(() => {
			loader.hide();
		}, 2000);
	}

	function notify(message) {
		toast(message, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 1500,
		});
	}

	function navUnderline(event) {
		if (event.target.matches("a")) {
			// console.log("event.target", event.target);
			const a = event.target;
			const nav = a.closest("nav");
			const left = a.offsetLeft;
			const width = a.offsetWidth;

			nav.style.setProperty("--left", left + "px");
			nav.style.setProperty("--width", width + "px");

			// check if a has business class
			if (a.classList.contains("business")) {
				nav.style.setProperty("--underline-color", "var(--color-shade");
			} else {
				nav.style.setProperty("--underline-color", "var(--color)");
			}
		}
	}

	const seletonLoading = ref(true);
	onUpdated(() => {
		seletonLoading.value = true;
		setTimeout(() => {
			seletonLoading.value = false;
		}, 2500);
	});

	return {
		mainMenuOpen,
		toggleMenu,
		notify,
		isMobile,

		navUnderline,
		loader,
		seletonLoading,
	};
});
