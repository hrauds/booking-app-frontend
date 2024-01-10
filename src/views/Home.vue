<template>
  <div class="page-container">
    <div class="header">
      <Header />
    </div>
    <div class="main-content">
      <div class="navigation">
        <router-link to="/home">Bookings</router-link>
        <router-link to="/houses">Manage Houses</router-link>
      </div>
      <Bookings />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Bookings from "@/views/Bookings.vue";
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  margin-left: 7rem;
}

.navigation {
  display: flex;
  color: white;
  margin-bottom: 2rem;
}

.navigation a {
  color: white;
  padding: 20px 40px;
  margin-right: 10px;
}

.navigation a:hover {
  background-color: #555;
  border-radius: 5px;
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
