import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App)

const token = localStorage.getItem('user-token')
if (token) {
    axios.defaults.headers.common['Authorization']= "Bearer " + token
}

app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
