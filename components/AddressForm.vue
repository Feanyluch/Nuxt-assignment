<template>
    <form class="form">
        <form-input :value="formData.country" label="Country" />
        <form-input :value="formData.state" label="State" />
        <form-input :value="formData.city" label="City" />
        <form-input :value="formData.street" label="Street" />
        <form-input :value="formData.zipCode" label="Zip Code" />
    </form>
</template>
  
<script>
import FormInput from "@/components/FormInput.vue";
import { toRefs } from 'vue';

export default {
    name: "AddressForm",
    components: {
        FormInput,
    },
    props: {
        value: Object,
    },
    setup(props) {
        const { value: formData } = toRefs(props);

        return {
            formData,
        };
    },
};
</script>
  
<style></style>