<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@use "sass:map";
@use "@sass/colors" as colors;
@use "@sass/breakpoints" as bp;

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: map.get(colors.$neutrals, "lightgray");
  padding: 16px;
}

@media screen and (min-width: map.get(bp.$breakpoints, "768")) {
  body {
    padding: 60px;
  }
}
</style>
