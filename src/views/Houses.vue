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

      <div class="content-container">
        <div class="house-selection">
          <h3>Select House</h3>
          <div class="house-menu">
            <div v-for="(house, index) in houses" :key="index" @click="selectHouse(house.id)" :class="{ active: isActive(house.id) }">
              {{ house.address }}
            </div>
            <div class="add-house-button">
              <router-link to="/add-house">
                <button>Add House</button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="options-menu">
          <h3>Options</h3>
          <router-link :to="{ name: 'add-time', params: { houseId: selectedHouse } }">Add Booking Time</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

const houses = ref([]);
const selectedHouse = ref(0);

const isActive = (id) => {
  return selectedHouse.value === id;
};

const selectHouse = (id) => {
  selectedHouse.value = id;
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

.content-container {
  display: flex;
  flex: 1;
  max-width: 1000px;
}


.house-selection,
.options-menu {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.house-selection h3,
.options-menu h3 {
  margin-bottom: 1rem;
  color: white;
}

.house-menu,
.options-menu {
  color: white;
  flex: 1;
}

.house-menu div,
.options-menu a {
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  color: #fff;

}

.house-menu .active {
  background-color: #59a4ff;
}

.add-house-button {
  margin-top: 1rem;
}

.options-menu a {
  background-color: #555;
}

.options-menu a:hover {
  background-color: #148c82;
}

</style>
