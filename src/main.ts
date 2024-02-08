import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/index.css'
import App from './App.vue'
const app = createApp(App)

import Dashboard from './pages/Dashboard.vue'
import Home from './pages/Home.vue'
import Email from './pages/Email.vue'
const router = new createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/dashboard', component: Dashboard },
      { path: '/email', component: Email },
     
    ]
  })

  app.use(router)
  app.mount('#app')
