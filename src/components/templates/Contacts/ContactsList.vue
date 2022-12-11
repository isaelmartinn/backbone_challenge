<script setup lang="ts">
import type { Contact } from "@domain/models/Contact";
import type { Pagination } from "@domain/models/Pagination";
import { ref, watchEffect } from "vue";

interface Props {
  contacts: Contact[];
  pagination: Pagination;
}

const props = defineProps<Props>();

const currentPage = ref(0);

watchEffect(() => {
  currentPage.value = props.pagination.currentPage;
});
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
      <el-table-column prop="createdAt" label="Created At" />
    </el-table>

    {{ currentPage }}

    <el-pagination
      v-model:current-page="currentPage"
      background
      layout="prev, pager, next"
      :page-count="props.pagination.totalPages"
    />
  </main>
</template>
