<template>
  <div class="signup">
    <h1>Create new account</h1>
    <form @submit.prevent="submitCustomer">
      <div class="form-group">
        <label for="name">First Name:</label>
        <input type="text" v-model="customer.firstName" required>
      </div>

      <div class="form-group">
        <label for="name">Last Name:</label>
        <input type="text" v-model="customer.lastName" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="customer.email" required>
      </div>

      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" v-model="customer.telephone" required>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const customer = ref({
  firstName: "",
  lastName: "",
  email: "",
  telephone: ""
});

const submitCustomer = async () => {
  try {
    const response = await axios.post(`/api/customer`, customer.value);
    console.log("Customer created", response.data);
  } catch (error) {
    console.error("Error creating customer", error);
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .signup {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
