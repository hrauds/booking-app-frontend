<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/company/houses">Houses</RouterLink>
    </nav>
    <div class="content">

      <template v-if="$route.path === '/'">
        <h1>Welcome to Game Time Booking Service</h1>
        <router-link to="/signup">
          <button>Book Now</button>
        </router-link>
      </template>

      <RouterView />
    </div>
  </div>
</template>

<style>

#app {
  text-align: center;
}

nav {
  position: fixed;
  text-align: center;
  top: 4rem;
  left: 4rem;
  right: 4rem;

  padding: 2rem;
}

nav a {
  margin-right: 4rem;
  font-size: 1.5em;
}

.content {
  margin-top: 12rem;
}

h1 {
  font-size: 2em;
  white-space: nowrap;
}

button {
  font-size: 1.2em;
  padding: 0.5em 1em;
  border: none;
  background-color: palegreen;
  cursor: pointer;
  margin-top: 1rem;
}

</style>
