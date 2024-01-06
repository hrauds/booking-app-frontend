<template>
  <div class="booking">
    <h2>Booking Form</h2>
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
        <select v-model="selectedService" required @change="fetchAvailableTimes">
          <option value="">Select</option>
          <option v-for="service in services" :key="service.id" :value="service.id">{{ service.serviceName }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">Select Date:</label>
        <input type="date" v-model="selectedDate" required @change="fetchAvailableTimes">
      </div>

      <div class="form-group">
        <label for="time">Select Time:</label>
        <select v-model="selectedTime" required>
          <option value="">Select</option>
          <option v-for="time in availableTimes" :key="time.id" :value="time">
            {{ time.startTime}} - {{ time.endTime }}
            ({{ time.resourceName }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" v-model="customer.firstName" required>
      </div>

      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="customer.lastName" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="customer.email" required>
      </div>

      <div class="form-group">
        <label for="telephone">Phone:</label>
        <input type="tel" v-model="customer.telephone" required>
      </div>
      <button type="button" @click="submitBooking">Book Now</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import router from "@/router";

const houses = ref([]);
const services = ref([]);
const selectedHouse = ref("");
const selectedService = ref("");
const selectedDate = ref("");
const selectedTime = ref("");
const availableTimes = ref([]);
const customer = ref({
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
});

const fetchHouses = async () => {
  try {
    const response = await axios.get("/api/open/house");
    houses.value = response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
  }
};

const fetchServices = async () => {
  if (selectedHouse.value) {
    try {
      const response = await axios.get(`/api/open/service/byHouseId/${selectedHouse.value}`);
      services.value = response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }
};

const fetchAvailableTimes = async () => {
  if (selectedService.value && selectedDate.value) {
    try {
      const response = await axios.get(`/api/open/bookable/${selectedService.value}/${selectedDate.value}`);
      availableTimes.value = response.data;
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  }
};

const addCustomer = async () => {
  try {
      const response = await axios.post('/api/open/customer', {
        firstName: customer.value.firstName,
        lastName: customer.value.lastName,
        email: customer.value.email,
        telephone: customer.value.telephone,
      });

      console.log("Customer added:", response.data);
      return response.data;

    } catch (error) {
      console.error("Error adding customer:", error);
      throw error;
    }
};

onMounted(async () => {
  await fetchHouses();
});

watch([selectedHouse], async ([newSelectedHouse]) => {
  if (newSelectedHouse) {
    await fetchServices();
  }
});

const submitBooking = async () => {
  if (selectedService.value && selectedDate.value && selectedTime.value && customer.value.firstName && customer.value.lastName
      && customer.value.email && customer.value.telephone) {
    try {
      const customerResponse = await addCustomer();

      const bookingData = {
        resourceId: selectedTime.value.resourceId,
        date: selectedDate.value,
        startTime: selectedTime.value.startTime,
        endTime: selectedTime.value.endTime,
        customerId: customerResponse.id,
      };
      const queryParams = new URLSearchParams(bookingData);
      const bookingResponse = await axios.post(`/api/open/booking?${queryParams}`);

      console.log("Booking submitted successfully:", bookingResponse);

      await axios.delete(`/api/open/bookable/${selectedTime.value.id}`);
      console.log("Bookable deleted");
      await router.push("/booking-submitted");

    } catch (error) {
      console.error("Error submitting booking:", error);
      console.error("Booking response data:", error.response.data);
    }
  } else {
    console.error("Please fill in all fields before submitting the booking.");
  }
};

</script>

<style scoped>
.booking {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

form {
  width: 100%;
  max-width: 400px;
  margin: auto;
  background-color: #fcf9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 7px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #1a1a1a;
}

select,
input[type="date"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
