<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Contact } from "@domain/models/Contact";
import { usePaginationStore } from "@/stores/pagination";
import { useRouter, type RouteParamsRaw } from "vue-router";
import type { Pagination } from "@domain/models/Pagination";
import { contactService } from "@domain/services/Contact.service";

import ContactsList from "@templates/Contacts/ContactsList.vue";

const paginationStore = usePaginationStore();

const router = useRouter();

const contacts = ref<Contact[]>([]);

let query = ref("");
let isLoading = ref(false);
let tablePagination = ref<Pagination>({
  perPage: 0,
  currentPage: 0,
  count: 0,
  totalPages: 0,
});

onMounted(() => {
  const page = paginationStore.getCurrentPage;

  loadContacts({ page });
});

const loadContacts = async (ops: { page: number; query?: string }) => {
  isLoading.value = true;

  const { isOk, data } = await contactService.getContacts(ops);

  if (!isOk) return;

  contacts.value = data.results;
  tablePagination.value = {
    perPage: data.perPage,
    currentPage: data.currentPage,
    count: data.count,
    totalPages: data.totalPages,
  };

  isLoading.value = false;
};

const handleCurrentPageChange = (ops: { page: number; query: string }) => {
  paginationStore.setCurrentPage(ops.page);

  loadContacts(ops);
};

const handleGoto = (routeName: string, params?: RouteParamsRaw) => {
  router.push({ name: routeName, params });
};

const handleSearch = (search: string) => {
  query.value = search;

  loadContacts({ page: 1, query: query.value });
};
</script>

<template>
  <contacts-list
    :contacts="contacts"
    :loading="isLoading"
    :pagination="tablePagination"
    @on-search="handleSearch"
    @on-click-create-contact="handleGoto('contactCreate')"
    @on-click-view-contact="handleGoto('contactView', { id: $event })"
    @on-click-edit-contact="handleGoto('contactEdit', { id: $event })"
    @on-click-delete-contact="handleGoto('contactDelete', { id: $event })"
    @on-current-page-change="handleCurrentPageChange({ page: $event, query })"
  ></contacts-list>
</template>
