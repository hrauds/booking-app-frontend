<template>
  <div class="booking">
    <h1>Booking Form</h1>
    <form @submit.prevent="submitBooking">
      <div class="form-group">
        <label for="house">Select House:</label>
        <select v-model="selectedHouse" required @change="fetchServices">
          <option value="">Select</option>
          <option v-for="house in houses" :key="house.id" :value="house.id">{{ house.address }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="service">Select Service:</label>
        <select v-model="selectedService" required>
          <option value="">Select</option>
          <option v-for="service in services" :key="service.id" :value="service.id">{{ service.serviceName }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Select Date:</label>
        <input type="date" v-model="selectedDate" required>
      </div>

      <button type="submit">Book Now</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";

const houses = ref([]);
const services = ref([]);
const selectedHouse = ref("");
const selectedService = ref("");
const selectedDate = ref("");

const fetchHouses = async () => {
  try {
    const response = await axios.get("/api/house");
    houses.value = response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
  }
};

const fetchServices = async () => {
  if (selectedHouse.value) {
    try {
      const response = await axios.get(`/api/service/byHouseId/${selectedHouse.value}`);
      services.value = response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }
};

onMounted(async () => {
  await fetchHouses();
});

watch(selectedHouse, async (newSelectedHouse) => {
  if (newSelectedHouse) {
    await fetchServices();
  }
});

const submitBooking = async () => {
  // TODO
};
</script>

<style>
@media (min-width: 1024px) {
  .booking {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
