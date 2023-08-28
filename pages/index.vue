<template>
  <div class="card">
    <div class="flex">
      <address-form :form-data="formData" />
      <map-component :zoom="zoom" :user-location="userLocation" :geojson="geojson" :geojson-options="geojsonOptions" />
    </div>
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import AddressForm from "@/components/AddressForm.vue";

export default {
  components: {
    MapComponent,
    AddressForm,
  },
  data() {
    return {
      zoom: 3,
      userLocation: [47.41322, -1.219482], // Default location
      geojson: {
        type: "FeatureCollection",
        features: [
          // ...
        ],
      },
      geojsonOptions: {
        pointToLayer: this.createCircleMarker,
        // Other options
      },
      formData: {
        country: "",
        state: "",
        city: "",
        street: "",
        zipCode: "",
      },
    };
  },
  async beforeMount() {
    const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");
    this.geojsonOptions.pointToLayer = (feature, latLng) =>
      circleMarker(latLng, { radius: 8 });
    this.getUserLocation(); // Get user's location on mount
  },
  methods: {
    createCircleMarker(feature, latLng) {
      const { circleMarker } = L; // Import circleMarker from Leaflet
      return circleMarker(latLng, { radius: 8 });
    },
    getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          this.userLocation = [latitude, longitude];

          // Assuming you have a function to fetch address details from coordinates
          this.fetchAddressFromCoordinates(latitude, longitude)
            .then((address) => {
              this.formData.country = address.country;
              this.formData.state = address.state;
              this.formData.city = address.city;
              this.formData.street = address.street;
              this.formData.zipCode = address.zipCode;
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
            });
        });
      } else {
        console.error("Geolocation is not available.");
      }
    },
    async fetchAddressFromCoordinates(latitude, longitude) {
      // Use an API or service to fetch address details based on coordinates
      // For example, you can use the OpenStreetMap Nominatim API as shown before.
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      // Extract the address components you need
      const address = {
        country: data.address.country,
        state: data.address.state,
        city: data.address.city,
        street: data.address.road, // Use road property for street
        zipCode: data.address.postcode,
      };

      return address;
    },
  },
  // Other methods and lifecycle hooks...
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: rgb(238, 238, 238);
}
.flex {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #ffffff;
  padding: 20px;
  gap: 20px;
  width: 70vw;
  border-radius: 10px;
}

.card {
  /* background: rgb(142, 173, 197); */
  /* padding: 20px; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  



