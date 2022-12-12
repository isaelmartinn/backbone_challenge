<script setup lang="ts">
import type { ApiContact } from "@domain/models/Contact";

import ContactForm from "@organisms/Contacts/ContactForm.vue";

const emit = defineEmits<{
  (e: "on-submit", contact: ApiContact): void;
  (e: "on-click-go-back"): void;
}>();
</script>

<template>
  <main class="contactCreate">
    <el-page-header @back="emit('on-click-go-back')">
      <template #content>
        <h1 class="contactCreate__title">View contact</h1>
      </template>
    </el-page-header>

    <contact-form
      @on-submit="emit('on-submit', $event)"
      @on-click-cancel="emit('on-click-go-back')"
    />
  </main>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "@sass/fonts" as fonts;

.contactCreate {
  display: grid;
  row-gap: 20px;
}

.contactCreate__title {
  font: map.get(fonts.$paragraph, "medium");
}
</style>
