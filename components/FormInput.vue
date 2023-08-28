<template>
    <div class="form-input">
        <label>{{ label }}:</label>
        <input :value="value" @input="$emit('input', $event.target.value)" />
    </div>
</template>
  
<script>
export default {
    name: "FormInput",
    props: {
        label: String,
        value: String,
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
  