<template>
  <TopMenu />
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitLogin" class="form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="loginData.email" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="loginData.password" required>
      </div>
    </form>
    <button type="submit" @click="submitLogin">Login</button>

  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "@/router";
import TopMenu from "@/components/TopMenu.vue";

const loginData = ref({
  email: "",
  password: ""
});

const submitLogin = async () => {
  try {
    const response = await axios.post("/api/open/user/login", loginData.value);
    const token = response.data;

    localStorage.setItem("user-token", token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    router.push('/home');
    console.log("Login successful");
  } catch (error) {
    console.error("Error during login", error);
  }
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form {
    width: 300px;
    margin: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    font-size: 1.2em;
    padding: 0.5em 1em;
    border: none;
    border-radius: 15px;
    background-color: palegreen;
    cursor: pointer;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
}
</style>
