import { createRouter, createWebHistory } from 'vue-router'
import HousesView from "@/views/HouseView.vue";
import BookingFormView from "@/views/BookingFormView.vue";
import SignUpView from "@/views/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/company/houses',
      name: 'house',
      component: HousesView
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingFormView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    }
  ]
})

export default router
