import { createRouter, createWebHistory } from 'vue-router'
import LogIn from "@/views/LogIn.vue";
import {requireAuth} from "@/auth";
import Home from "@/views/Home.vue";
import AddHouse from "@/views/AddHouse.vue";
import BookingForm from "@/views/customer/BookingForm.vue";
import BookingSubmitted from "@/views/customer/BookingSubmitted.vue";
import Houses from "@/views/Houses.vue";
import AddTime from "@/views/AddTime.vue";

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
      path: '/houses',
      name: 'houses',
      beforeEnter: requireAuth,
      component: Houses,
    },
    {
      path: '/add-house',
      name: 'add-house',
      beforeEnter: requireAuth,
      component: AddHouse,
    },
    {
      path: '/add-time/:houseId',
      name: 'add-time',
      beforeEnter: requireAuth,
      component: AddTime,
    },
  ]
})

export default router
