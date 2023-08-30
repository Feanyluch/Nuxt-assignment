<template>
  <div class="card">
    <h2>Location</h2>
    <div class="grid">
      <address-form :value="formData" />
      <map-component :zoom="zoom" :user-location="userLocation" :geojson="geojson" :geojson-options="geojsonOptions" />
    </div>
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent.vue";
import AddressForm from "@/components/AddressForm.vue";
import { ref, onBeforeMount } from 'vue';

export default {
  components: {
    MapComponent,
    AddressForm,
  },
  setup() {
    const zoom = ref(3);
    const userLocation = ref([47.41322, -1.219482]);
    const geojson = ref({
      type: "FeatureCollection",
      features: [],
    });
    const geojsonOptions = ref({
      pointToLayer: createCircleMarker,
    });
    const formData = ref({
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
    });

    const createCircleMarker = (feature, latLng) => {
      const { circleMarker } = L;
      return circleMarker(latLng, { radius: 8 });
    };

    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          userLocation.value = [latitude, longitude];

          try {
            const address = await fetchAddressFromCoordinates(latitude, longitude);
            formData.value.country = address.country;
            formData.value.state = address.state;
            formData.value.city = address.city;
            formData.value.street = address.street;
            formData.value.zipCode = address.zipCode;
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        });
      } else {
        console.error("Geolocation is not available.");
      }
    };

    const fetchAddressFromCoordinates = async (latitude, longitude) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      const address = {
        country: data.address.country,
        state: data.address.state,
        city: data.address.county,
        street: data.address.road,
        zipCode: data.address.postcode,
      };

      return address;
    };

    onBeforeMount(async () => {
      const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");
      geojsonOptions.value.pointToLayer = (feature, latLng) =>
        circleMarker(latLng, { radius: 8 });
      getUserLocation();
    });

    return {
      zoom,
      userLocation,
      geojson,
      geojsonOptions,
      formData,
    };
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

h2{
  color: gray;
}

.grid {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
  



