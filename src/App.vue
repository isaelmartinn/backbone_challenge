<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@use "@sass/colors" as colors;
@use "sass:map";

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: map.get(colors.$neutrals, "lightgray");
}
</style>
