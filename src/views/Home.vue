<template>
  <div class="page-container">
    <TopMenu />
    <div class="content-container">
      <div class="side-menu">
        <SideMenu />
      </div>
      <div class="main-content">
        <BookingsMenu />
        <AllBookings />
      </div>
    </div>
  </div>
</template>

<script setup>
import SideMenu from "@/components/SideMenu.vue";
import TopMenu from "@/components/TopMenu.vue";
import BookingsMenu from "@/components/BookingsMenu.vue";
import AllBookings from "@/views/AllBookings.vue";
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-container {
  display: flex;
  flex: 1;
}

.side-menu {
  width: 200px;
  height: 100vh;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
</style>
