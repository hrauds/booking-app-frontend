import { createRouter, createWebHistory } from 'vue-router'
import HousesView from "@/views/HouseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/company/houses',
      name: 'house',
      component: HousesView
    }
  ]
})

export default router
