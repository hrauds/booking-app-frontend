<template>
  <div class="content">
    <div class="header">
      <Header />
    </div>
    <div class="add-house">
      <h2>Add House</h2>
      <form @submit.prevent="submitForm">
        <label for="address">Address:</label>
        <input type="text" v-model="address" id="address" required>

        <label for="companyId">Company ID:</label>
        <select v-model="companyId" id="companyId" required>
          <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.id }}</option>
        </select>
        <button type="submit">Add House</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";
import router from "@/router";

const address = ref('');
const companyId = ref(null);
const companies = ref([]);

const fetchCompanies = async () => {
  try {
    const response = await axios.get('/api/company');
    companies.value = response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

const submitForm = async () => {
  try {
    const response = await axios.post('/api/house', {
      address: address.value,
      companyId: companyId.value,
    });
    console.log('House added successfully:', response.data);
    await router.push("/houses");
  } catch (error) {
    console.error('Error adding house:', error);
  }
};

onMounted(() => {
  fetchCompanies();
});
</script>

<style scoped>

.add-house {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
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
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #1a1a1a;
}

select, input {
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
