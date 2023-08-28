<template>
    <div class="card">
      <h1>Welcome to My Vue Leaflet Map</h1>
      <div class="flex">
        <map-component />
      </div>
    </div>
  </template>
  
  <script>
  import MapComponent from "@/components/MapComponent.vue"; // Adjust the path accordingly
  
  export default {
    components: {
      MapComponent,
    },
  };
  </script>
  
  <style>
  /* Your CSS styles here */
  .card {
    background: #ffffff;
    padding: 10px;
  }

  .flex {
    display: flex;
  }
  </style>
  