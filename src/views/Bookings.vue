<template>
  <div class="bookings">
    <h2>Bookings</h2>

    <div class="filters">
      <label for="selectDate">Show bookings starting:</label>

      <input type="date" v-model="selectedDate" id="selectDate" />

      <label for="sortProperty">Sort By:</label>
      <select v-model="sortProperty" id="sortProperty">
        <option value="id">ID</option>
        <option value="startTime">Start Time</option>
        <option value="resourceId">Resource ID</option>
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" id="sortDirection">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>

      <button class="searchButton" @click="searchBookings">Search</button>
    </div>

    <div>
      <table class="bookings-table">
        <caption></caption>
        <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Time Slot</th>
          <th>Service</th>
          <th>Resource ID</th>
          <th>Address</th>
        </tr>
        </thead>
        <tbody v-if="bookings.length > 0">
        <tr v-for="booking in bookings" :key="booking.id" class="booking-item">
          <td>{{ booking.id }}</td>
          <td>{{ formatDate(booking.startTime) }}</td>
          <td>{{ formatTimeSlot(booking.startTime, booking.endTime) }}</td>
          <td>{{ booking.serviceName }}</td>
          <td>{{ booking.resourceId }}</td>
          <td>{{ booking.address }}</td>
        </tr>
        </tbody>
      </table>
      <div v-if="bookings.length === 0">
        <p>No bookings found.</p>
      </div>
    </div>

    <div class="pagination">
      <button :disabled="currentPage === 0" @click="goToPage(currentPage - 1)">Previous</button>
      <span>Page {{ currentPage + 1 }}</span>
      <button :disabled="!nextPageExists" @click="goToPage(currentPage + 1)">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedDate: new Date().toISOString().split('T')[0],
      sortProperty: 'id',
      sortDirection: 'ASC',
      bookings: [],
      currentPage: 0,
      nextPageExists: true,
      pageSize: 2,
    };
  },

  mounted() {
    this.searchBookings();
  },

  methods: {
    async searchBookings() {
      try {
        const response = await axios.get('/api/open/booking/customize', {
          params: {
            page: this.currentPage,
            size: this.pageSize,
            property: this.sortProperty,
            dir: this.sortDirection,
            fromStartDate: this.selectedDate + 'T00:00:00',
          },
        });

        console.log('Response:', response);

        this.bookings = response.data;

        this.nextPageExists = response.data.length === this.pageSize;

        console.log('Bookings:', this.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },

    goToPage(page) {
      this.currentPage = page;
      this.searchBookings();
    },

    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toLocaleDateString();
    },

    formatTimeSlot(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      const startHours = startDate.getHours();
      const startMinutes = startDate.getMinutes();

      const endHours = endDate.getHours();
      const endMinutes = endDate.getMinutes();

      const formattedStartTime = `${startHours}:${startMinutes < 10 ? '0' : ''}${startMinutes}`;
      const formattedEndTime = `${endHours}:${endMinutes < 10 ? '0' : ''}${endMinutes}`;

      return `${formattedStartTime} - ${formattedEndTime}`;
    }
  },
};
</script>

<style scoped>
.bookings {
  max-width: 1000px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: white;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.bookings-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.bookings-table th, .bookings-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.bookings-table th {
  background-color: #83b9fa;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

button {
  background-color: #59a4ff;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.searchButton {
  background-color: #148c82;

}
</style>
