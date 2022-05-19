<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ name: 'App' })
export default class App extends Vue {
  message = 'v2-class-component-mpa Home';
}
</script>

<style lang="less">
#app {
  text-align: center;
}
</style>
