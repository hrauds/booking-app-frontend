<template>
  <div>
    <TopMenu />
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
import TopMenu from "@/components/TopMenu.vue";
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
  max-width: 400px;
  margin: auto;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

button {
  padding: 10px;
  background-color: #148c82;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
