import { createRouter, createWebHistory } from 'vue-router'
import LogIn from "@/views/LogIn.vue";
import {requireAuth} from "@/auth";
import Home from "@/views/Home.vue";
import AddHouse from "@/views/AddHouse.vue";
import BookingForm from "@/views/customer/BookingForm.vue";
import BookingSubmitted from "@/views/customer/BookingSubmitted.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn,
    },
    {
      path: '/book',
      name: 'book',
      component: BookingForm,
    },
    {
      path: '/booking-submitted',
      name: 'booking-submitted',
      component: BookingSubmitted,
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: requireAuth,
      component: Home,
    },
    {
      path: '/houses/:id',
      name: 'services',
      beforeEnter: requireAuth,
      component: Home,
    },
    {
      path: '/add-house',
      name: 'add-house',
      beforeEnter: requireAuth,
      component: AddHouse,
    },
  ]
})

export default router
