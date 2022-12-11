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
  <main class="contactList">
    <h1 class="contactList__title">Contacts List</h1>

    <section class="contactList__table">
      <el-table :data="props.contacts" stripe>
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

      <br />

      <el-pagination
        class="table__pagination"
        v-model:current-page="currentPage"
        background
        layout="prev, pager, next"
        :page-count="props.pagination.totalPages"
        @current-change="handleCurrentPageChange"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "@sass/colors" as colors;
@use "@sass/breakpoints" as bp;

@use "sass:map";

.contactList {
  padding: 16px;
}
.contactList__table {
  margin: 0 auto;
  width: min(100%, 1000px);
}

.table__pagination {
  float: right;
}

.contactList__title {
  color: map.get(colors.$neutrals, "darkBlue");
  margin: 0 auto 50px auto;
  width: fit-content;
}

@media screen and (min-width: map.get(bp.$breakpoints, "768")) {
  .contactList {
    padding: 60px;
  }
}
</style>
