<template>
  <div class="card">
    <div class="flex">
      <address-form :value="formData" />
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
      userLocation: [47.41322, -1.219482],
      geojson: {
        type: "FeatureCollection",
        features: [
        ],
      },
      geojsonOptions: {
        pointToLayer: this.createCircleMarker,
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
    this.getUserLocation();
  },
  methods: {
    createCircleMarker(feature, latLng) {
      const { circleMarker } = L;
      return circleMarker(latLng, { radius: 8 });
    },
    getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          this.userLocation = [latitude, longitude];

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
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
<<<<<<< HEAD

      console.log("Fetched address data:", data);

      const address = {
        country: data.address.country,
        state: data.address.state,
        city: data.address.county,
=======
      const address = {
        country: data.address.country,
        state: data.address.state,
        city: data.address.city,
>>>>>>> 7094fd5895b6dc8f7313ca3a6cab8dede04dd4b0
        street: data.address.road,
        zipCode: data.address.postcode,
      };

      console.log("Extrated Address", address)

      return address;
    },

  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: rgb(238, 238, 238);
  font-family: 'Inter', sans-serif;
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
  



