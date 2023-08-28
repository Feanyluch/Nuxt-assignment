<template>
        <form>
            <div class="form-input">
                <label>Country:</label>
                <input v-model="formData.country" />
            </div>
            <div class="form-input">
                <label>State:</label>
                <input v-model="formData.state" />
            </div>
            <div class="form-input">
                <label>City:</label>
                <input v-model="formData.city" />
            </div>
            <div class="form-input">
                <label>Street:</label>
                <input v-model="formData.street" />
            </div>
            <div class="form-input">
                <label>Zip Code:</label>
                <input v-model="formData.zipCode" />
            </div>
        </form>
</template>

<script>
export default {
    props: {
        formData: Object, // Pass the formData as a prop
    },
};
</script>

<style scoped>
input {
    outline: none;
}

.form-input {
    margin: 10px 0;
}
</style>