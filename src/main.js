import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { firebaseApp } from "./firebase.js";
import { VueFire, VueFireAuth } from "vuefire";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import "vue3-toastify/dist/index.css";

import App from "./App.vue";
import router from "./router";

import "./styles/site.css";

const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
	store.router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
});

app.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyBL6YlN6IJIUDmw0H8j-INaNdgvEYrgufs",
		libraries: "places",
	},
});

app.mount("#app");
