import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useInterfaceStore = defineStore("interface", function () {
	const mainMenuOpen = ref(false);

	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
	}

	function notify(message) {
		toast(message, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 1500,
		});
	}

	function navUnderline(event) {
		if (event.target.matches("a")) {
			const a = event.target;
			const nav = a.closest("nav");
			const left = a.offsetLeft;
			const width = a.offsetWidth;

			nav.style.setProperty("--left", left + "px");
			nav.style.setProperty("--width", width + "px");

			// check if a has business class
			if (a.classList.contains("business")) {
				nav.style.setProperty("--underline-color", "brown");
			} else {
				nav.style.setProperty("--underline-color", "var(--highlight)");
			}
		}
	}

	return {
		mainMenuOpen,
		toggleMenu,
		notify,

		navUnderline,
	};
});
