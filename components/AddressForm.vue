<template>
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
</template>
  
<script>
export default {
    props: {
        formData: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped>
/* Your CSS styles here */
</style>
  