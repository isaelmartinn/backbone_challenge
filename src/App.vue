<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@use "@sass/colors" as colors;
@use "sass:map";

body {
  background-color: map.get(colors.$neutrals, "lightgray");
}
</style>
