<template>
    <div style="" class="map">
        <l-map :zoom="zoom" :center="userLocation" :useGlobalLeaflet="false">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
            <l-geo-json :geojson="geojson" :options="geojsonOptions" />
            <l-marker :lat-lng="userLocation"></l-marker>
        </l-map>
    </div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
    name: "MapComponent",
    components: {
        LMap,
        LTileLayer,
        LGeoJson,
        LMarker,
    },
    props: {
        zoom: Number,
        userLocation: Array,
        geojson: Object,
        geojsonOptions: Object,
    },
};
</script>
  
<style>
.map {
    height: 100%;
    width: 100%;
    border-radius: 10px;
}
</style>  