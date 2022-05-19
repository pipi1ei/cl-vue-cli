<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const message = ref('v2-composition-api-mpa About');

    return {
      message
    };
  }
});
</script>

<style lang="less">
#app {
  text-align: center;
}
</style>
