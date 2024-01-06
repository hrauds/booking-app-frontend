<template>
  <div class="page-container">
    <div class="header">
      <Header />
    </div>
    <div class="content-container">
      <div class="house-menu">
        <ul>
          <li v-for="(house, index) in houses" :key="index" @click="selectHouse(index)" :class="{ active: isActive(index) }">
            {{ house.address }}
          </li>
        </ul>
        <div class="add-house-button">
          <router-link to="/add-house">
            <button>Add house</button>
          </router-link>
        </div>
      </div>
      <div class="main-content">
        <Bookings :selectedHouse="selectedHouse" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Bookings from "@/views/Bookings.vue";
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

const houses = ref([]);
const selectedHouse = ref(0); // Set default selected house index

const isActive = (index) => {
  return selectedHouse.value === index;
};

const selectHouse = (index) => {
  selectedHouse.value = index;
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/open/house');
    houses.value = response.data;
  } catch (error) {
    console.error('Error fetching houses:', error);
  }
});

watch(() => selectedHouse, (newIndex) => {
  console.log('Selected house changed to:', houses.value[newIndex].address);
});
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

.main-content {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  margin-left: 7rem;
}

.house-menu {
  margin-top: 4rem;
  width: 200px;
  color: white;
}

.house-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.house-menu li {
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 10px;
  padding: 12px;
}

.house-menu .active {
  background-color: #59a4ff;
  color: #fff;
}

.add-house-button {
  margin-top: 4rem;
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
