<script setup lang="ts">
import { computed } from "vue";
import type { Contact } from "@domain/models/Contact";

import ContactCard from "@organisms/Contacts/ContactCard.vue";

interface Props {
  contact: Contact;
  loading?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "on-click-go-back"): void;
}>();

const contactFullName = computed(() => {
  return `${props.contact.name.first} ${props.contact.name.last}`;
});
</script>

<template>
  <main class="contactView">
    <el-page-header @back="emit('on-click-go-back')">
      <template #content>
        <h1 class="contactView__title">View contact</h1>
      </template>
    </el-page-header>

    <contact-card
      :loading="loading"
      :name="contactFullName"
      :email="props.contact.email"
      :phone="props.contact.phone"
      :created-at="props.contact.createdAt"
    ></contact-card>
  </main>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "@sass/fonts" as fonts;

.contactView {
  width: min(100%, 800px);
  margin: 50px auto 0 auto;
  display: grid;
  row-gap: 30px;
}

.contactView__title {
  font: map.get(fonts.$paragraph, "medium");
}
</style>
