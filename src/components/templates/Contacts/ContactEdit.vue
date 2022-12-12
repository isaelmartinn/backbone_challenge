<script setup lang="ts">
const emit = defineEmits<{
  (e: "on-click-go-back"): void;
}>();
</script>

<template>
  <main>
    <el-page-header @back="emit('on-click-go-back')">
      <template #content>
        <h1 class="contactEdit__title">Edit contact</h1>
      </template>
    </el-page-header>
  </main>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "@sass/fonts" as fonts;

.contactEdit__title {
  font: map.get(fonts.$paragraph, "medium");
}
</style>
