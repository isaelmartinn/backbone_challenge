<script setup lang="ts">
import { onMounted, ref } from "vue";
import { contactService } from "@domain/services/Contact.service";
import type { Contact } from "@domain/models/Contact";
import type { Pagination } from "@domain/models/Pagination";

import ContactsList from "@templates/Contacts/ContactsList.vue";

const contacts = ref<Contact[]>([]);
let tablePagination = ref<Pagination>({
  perPage: 0,
  currentPage: 0,
  count: 0,
  totalPages: 0,
});

onMounted(async () => {
  const response = await contactService.getContacts();

  contacts.value = response.results;
  tablePagination.value = {
    perPage: response.perPage,
    currentPage: response.currentPage,
    count: response.count,
    totalPages: response.totalPages,
  };
});
</script>

<template>
  <contacts-list
    :contacts="contacts"
    :pagination="tablePagination"
  ></contacts-list>
</template>
