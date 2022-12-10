<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { contactService } from "@domain/services/Contact.service";

onMounted(async () => {
  const contacts = await contactService.getContacts();
  console.log(contacts);
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
