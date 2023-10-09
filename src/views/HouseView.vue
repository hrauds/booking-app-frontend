<template>
  <div class="house">
    <h1>Houses</h1>
    <table>
      <tr>
        <th>House id</th>
        <th>Address</th>
      </tr>
      <tr v-for="house in houses">
        <td>{{house.houseId}}</td>
        <td>{{house.address}}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
  import axios from "axios";
  import {h, onMounted, ref} from "vue";

  const houses = ref([])

  onMounted(() => {
    axios.get("/api/house")
        .then(response => {
          houses.value = response.data
        })
    console.log("test");
  })
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
