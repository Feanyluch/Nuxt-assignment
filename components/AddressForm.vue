<template>
    <form class="form">
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
    name: "AddressForm",
    props: {
        formData: Object,
    },
};
</script>
  
<style>
.form-input {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
}

label {
    margin: 5px 0;
}

input {
    height: 30px;
    padding: 0 5px;
    outline: none;
    border: 1px solid rgb(196, 195, 195);
    border-radius: 5px;
}
</style>
  