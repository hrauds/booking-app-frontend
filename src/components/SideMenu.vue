<template>
  <div>
    <div class="side-menu">
      <ul>
        <router-link v-for="(house, index) in houses" :key="index" :to="'/houses/' + house.id">
          <li :class="{ active: isActive(index) }">
            {{ house.address }}
          </li>
        </router-link>

      </ul>
      <router-link to="/add-house">
        <button>Add house</button>
      </router-link>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      houses: [],
      activeHouse: null,
    };
  },
  methods: {
    isActive(index) {
      return this.activeHouse === index;
    },
    updateActiveHouse() {
      const houseId = parseInt(this.$route.params.id);
      this.activeHouse = this.houses.findIndex(house => house.id === houseId);
    },
  },
  watch: {
    $route() {
      this.updateActiveHouse();
    },
  },
  created() {
    axios.get('/api/open/house')
        .then(response => {
          this.houses = response.data;
          this.updateActiveHouse();
        })
        .catch(error => {
          console.error('Error fetching houses:', error);
        });
  },
};
</script>

<style scoped>
.side-menu {
  width: 200px;
  padding: 20px;
  color: white;
}

.side-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.side-menu li {
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 10px;
  padding: 12px;
}


.side-menu .active {
  background-color: #18523c;
  color: #fff;
}

button {
  margin-top: 3rem;
  font-size: small;
  padding: 0.5em 1em;
  border: none;
  border-radius: 15px;
  background-color: palegreen;
  cursor: pointer;
}
</style>
