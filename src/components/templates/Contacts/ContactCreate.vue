<script setup lang="ts">
import { ref } from "vue";
import type { ApiContact } from "@domain/models/Contact";

import ContactForm from "@organisms/Contacts/ContactForm.vue";

interface Props {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  primaryBtnLabel: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "on-submit", contact: ApiContact): void;
  (e: "on-click-go-back"): void;
}>();

const contactFormRef = ref();

defineExpose({
  contactFormRef,
});
</script>

<template>
  <main class="contactCreate">
    <el-page-header @back="emit('on-click-go-back')">
      <template #content>
        <h1 class="contactCreate__title">{{ props.title }}</h1>
      </template>
    </el-page-header>

    <contact-form
      ref="contactFormRef"
      :loading="props.loading"
      :disabled="props.disabled"
      :primary-btn-label="primaryBtnLabel"
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
  margin: 50px auto 0 auto;
  width: min(100%, 500px);

  &__title {
    font: map.get(fonts.$paragraph, "medium");
  }
}
</style>
