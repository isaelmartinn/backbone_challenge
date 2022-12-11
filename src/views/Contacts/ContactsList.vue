<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, type RouteParamsRaw } from "vue-router";
import type { Contact } from "@domain/models/Contact";
import type { Pagination } from "@domain/models/Pagination";
import { contactService } from "@domain/services/Contact.service";

import ContactsList from "@templates/Contacts/ContactsList.vue";

const router = useRouter();

const contacts = ref<Contact[]>([]);

let isLoading = ref(false);
let tablePagination = ref<Pagination>({
  perPage: 0,
  currentPage: 0,
  count: 0,
  totalPages: 0,
});

onMounted(() => loadContacts());

const loadContacts = async (currentPage: number = 1) => {
  isLoading.value = true;
  const response = await contactService.getContacts(currentPage);

  contacts.value = response.results;
  tablePagination.value = {
    perPage: response.perPage,
    currentPage: response.currentPage,
    count: response.count,
    totalPages: response.totalPages,
  };

  isLoading.value = false;
};

const handleCurrentPageChange = (currentPage: number) => {
  loadContacts(currentPage);
};

const handleGoto = (routeName: string, params?: RouteParamsRaw) => {
  router.push({ name: routeName, params });
};
</script>

<template>
  <contacts-list
    :contacts="contacts"
    :loading="isLoading"
    :pagination="tablePagination"
    @on-current-page-change="handleCurrentPageChange"
    @on-click-create-contact="handleGoto('contactCreate')"
    @on-click-view-contact="handleGoto('contactView', { id: $event })"
    @on-click-delete-contact="handleGoto('contactDelete', { id: $event })"
  ></contacts-list>
</template>
