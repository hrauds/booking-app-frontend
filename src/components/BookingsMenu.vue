<template>
  <div class="menu">
    <div class="menu-links">
      <router-link :to="`${$route.path}/all-bookings`">All Bookings</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    },
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('user-token');
    },
    handleLogout() {
      localStorage.removeItem('user-token');
      delete axios.defaults.headers.common["Authorization"];
      this.isLoggedIn = false;
      router.push('/');
    },
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-title h1 {
  font-size: 1.5rem;
  margin: 0;
}

.menu-links {
  display: flex;
  gap: 20px;

}


</style>
