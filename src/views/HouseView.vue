<template>
  <div class="house">
    <h1>Houses</h1>
    <table>
      <tr>
        <th>Address</th>
      </tr>
      <tr v-for="house in houses" :key="house.id">
        <td @click="loadServices(house.id)">{{ house.address }}</td>
      </tr>
    </table>
    <div v-if="selectedHouse">
      <h2>Services for {{ selectedHouse.address }}</h2>
      <ul>
        <li v-for="service in services" :key="service.id">{{ service.serviceName }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const houses = ref([]);
const selectedHouse = ref(null);
const services = ref([]);

const loadServices = async (houseId) => {
  selectedHouse.value = houses.value.find((house) => house.id === houseId);
  services.value = await fetchServices(houseId);
};

const fetchServices = async (houseId) => {
  try {
    const response = await axios.get(`/api/service/byHouseId/${houseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

onMounted(async () => {
  try {
    const response = await axios.get("/api/house");
    houses.value = response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
  }
});
</script>

<style>
@media (min-width: 1024px) {
  .house {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
