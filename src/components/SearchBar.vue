<template>
  <input
      type="text"
      :placeholder="placeholder"
      v-model="localValue"
      @input="updateValue"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: 'Search...',
    },
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    updateValue() {
      this.$emit('update:modelValue', this.localValue);
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
