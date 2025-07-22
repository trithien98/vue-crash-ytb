import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";


const app = createApp(App);
app.use(router);

app.use(Toast);
app.mount('#app')
