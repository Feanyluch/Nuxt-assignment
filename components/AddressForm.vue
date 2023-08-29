<template>
    <form class="form">
        <form-input label="Country" :value="formData.country" />
        <form-input label="State" :value="formData.state" />
        <form-input label="City" :value="formData.city" />
        <form-input label="Street" :value="formData.street" />
        <form-input label="Zip Code" :value="formData.zipCode" />
    </form>
</template>
  
<script>
import FormInput from "@/components/FormInput.vue"; // Adjust the path accordingly

export default {
    name: "AddressForm",
    components: {
        FormInput,
    },
    props: {
        value: Object,
    },
    computed: {
        formData: {
            get() {
                console.log('formData getter:', this.value);
                return this.value;
            },
            set(formData) {
                console.log('formData setter:', formData);
                this.$emit('input', formData);
            },
        },

    },
};
</script>
  
<style></style>
  