<template>
  <div class="bookings-view">
    <table>
      <thead>
      <tr>
        <th>Booking ID</th>
        <th>Date</th>
        <th>Time Slot</th>
        <th>Resource Name</th>
        <th>Customer Name</th>
      </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.bookings-view {
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #cccccc;
  color: black;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
