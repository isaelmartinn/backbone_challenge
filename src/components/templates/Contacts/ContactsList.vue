<script setup lang="ts">
import dayjs from "dayjs";
import { ref, watchEffect } from "vue";

import type { Contact } from "@domain/models/Contact";
import type { Pagination } from "@domain/models/Pagination";

interface Props {
  contacts: Contact[];
  pagination: Pagination;
  loading?: boolean;
}

const props = defineProps<Props>();

const currentPage = ref(0);

const emit = defineEmits<{
  (e: "on-click-create-contact"): void;
  (e: "on-click-view-contact", id: string): void;
  (e: "on-click-delete-contact", id: string): void;
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

    <div class="contactList__actions">
      <el-button
        size="large"
        type="primary"
        @click="emit('on-click-create-contact')"
      >
        Create Contact
      </el-button>
    </div>

    <section class="contactList__table">
      <el-table :data="props.contacts" stripe>
        <el-table-column label="Name">
          <template #default="{ row: { name } }">
            <el-skeleton v-if="loading" :rows="0" animated />
            <template v-else> {{ name.first }} {{ name.last }} </template>
          </template>
        </el-table-column>

        <el-table-column label="Email">
          <template #default="{ row: { email } }">
            <el-skeleton v-if="loading" :rows="0" animated />
            <template v-else> {{ email }} </template>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="Phone">
          <template #default="{ row: { phone } }">
            <el-skeleton v-if="loading" :rows="0" animated />
            <template v-else> {{ phone }} </template>
          </template>
        </el-table-column>

        <el-table-column label="Created At">
          <template #default="{ row: { createdAt } }">
            <el-skeleton v-if="loading" :rows="0" animated />
            <template v-else> {{ formatDate(createdAt) }} </template>
          </template>
        </el-table-column>

        <el-table-column label="Operations">
          <template #default="scope">
            <el-button
              size="small"
              :disabled="loading"
              @click="emit('on-click-view-contact', scope.row.id)"
            >
              view
            </el-button>

            <el-button
              size="small"
              :disabled="loading"
              @click="emit('on-click-delete-contact', scope.row.id)"
            >
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <br />

      <el-pagination
        v-model:current-page="currentPage"
        background
        class="table__pagination"
        layout="prev, pager, next"
        :disabled="loading"
        :page-count="props.pagination.totalPages"
        @current-change="handleCurrentPageChange"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "@sass/colors" as colors;
@use "@sass/fonts" as fonts;

.contactList {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
  width: min(100%, 1000px);
  margin: 0 auto;

  &__table {
    width: 100%;
  }

  &__title {
    color: map.get(colors.$neutrals, "darkBlue");
    margin-bottom: 50px;
    width: fit-content;
    font: map.get(fonts.$heading, "large");
  }

  &__actions {
    align-self: flex-end;
  }
}

.table__pagination {
  float: right;
}
</style>
