<template>
  <div class="menu">
    <div class="menu-title">
      <h1>Game Time Booking Management</h1>
    </div>
    <div class="menu-login" v-if="isLoggedIn">

      <button @click="handleLogout" class="logout-btn">Log Out</button>
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
}

.menu-title h1 {
  font-size: 1.5rem;
  margin: 0;
}

.menu-login {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
}

button {
  background-color: #148c82;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2aa491;
}
</style>
