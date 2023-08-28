<template>
    <div class="flex">
        <div style="height:600px; width:100%">
            <l-map :zoom="zoom" :center="userLocation" :useGlobalLeaflet="false">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                    name="OpenStreetMap"></l-tile-layer>
                <l-geo-json :geojson="geojson" :options="geojsonOptions" />
                <l-marker :lat-lng="userLocation"></l-marker>
            </l-map>
        </div>
        <form>
            <label>Country:</label>
            <input v-model="formData.country" />

            <label>State:</label>
            <input v-model="formData.state" />

            <label>City:</label>
            <input v-model="formData.city" />

            <label>Street:</label>
            <input v-model="formData.street" />

            <label>Zip Code:</label>
            <input v-model="formData.zipCode" />
        </form>
    </div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        LMarker,
    },
    data() {
        return {
            zoom: 2,
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
};
</script>
  
<style></style>  