<script setup lang="ts">
import { onMounted, ref } from "vue";
import { contactService } from "@domain/services/Contact.service";
import type { Contact } from "@domain/models/Contact";

import ContactsList from "@templates/Contacts/ContactsList.vue";

const contacts = ref<Contact[]>([]);

onMounted(async () => {
  const response = await contactService.getContacts();
  contacts.value = response.results;
});
</script>

<template>
  <contacts-list :contacts="contacts"></contacts-list>
</template>
