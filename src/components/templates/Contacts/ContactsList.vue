<script setup lang="ts">
import { ref, watchEffect } from "vue";
import dayjs from "dayjs";

import type { Contact } from "@domain/models/Contact";
import type { Pagination } from "@domain/models/Pagination";

interface Props {
  contacts: Contact[];
  pagination: Pagination;
}

const props = defineProps<Props>();

const currentPage = ref(0);

const emit = defineEmits<{
  (e: "on-current-page-change", currentPage: number): void;
}>();

watchEffect(() => {
  currentPage.value = props.pagination.currentPage;
});

const handleCurrentPageChange = (currentPage: number) => {
  emit("on-current-page-change", currentPage);
};

const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY");
</script>

<template>
  <main>
    <el-table :data="props.contacts" stripe style="width: 100%">
      <el-table-column label="Name">
        <template #default="{ row: { name } }">
          {{ name.first }} {{ name.last }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column label="Created At">
        <template #default="{ row: { createdAt } }">
          {{ formatDate(createdAt) }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      background
      layout="prev, pager, next"
      :page-count="props.pagination.totalPages"
      @current-change="handleCurrentPageChange"
    />
  </main>
</template>
