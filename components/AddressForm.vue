<template>
    <form class="form">
        <form-input v-model="formData.country" label="Country" />
        <form-input v-model="formData.state" label="State" />
        <form-input v-model="formData.city" label="City" />
        <form-input v-model="formData.street" label="Street" />
        <form-input v-model="formData.zipCode" label="Zip Code" />
    </form>
</template>
  
<script>
import FormInput from "@/components/FormInput.vue"; // Adjust the path accordingly
import { ref } from 'vue';

export default {
    name: "AddressForm",
    components: {
        FormInput,
    },
    props: {
        value: Object,
    },
    setup(props, { emit }) {
        const formData = ref(props.value);

        return {
            formData,
        };
    },
};
</script>
  
<style>
/* ... styles ... */
</style>
  