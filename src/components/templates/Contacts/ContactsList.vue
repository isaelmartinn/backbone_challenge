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

const query = ref("");
const currentPage = ref(0);

const emit = defineEmits<{
  (e: "on-click-create-contact"): void;
  (e: "on-search", query: string): void;
  (e: "on-click-edit-contact", id: string): void;
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
      <form @submit.prevent="emit('on-search', query)" class="actions__search">
        <el-input v-model="query" placeholder="Search by email" />

        <el-button size="large" native-type="submit"> Search </el-button>
      </form>

      <el-button
        class="actions__create"
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
              View
            </el-button>

            <el-button
              size="small"
              :disabled="loading"
              @click="emit('on-click-delete-contact', scope.row.id)"
            >
              Delete
            </el-button>

            <el-button
              size="small"
              :disabled="loading"
              @click="emit('on-click-edit-contact', scope.row.id)"
            >
              Edit
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
@use "@sass/fonts" as fonts;
@use "@sass/colors" as colors;
@use "@sass/breakpoints" as bp;

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
    display: grid;
    width: 100%;
    gap: 20px 50px;
  }
}

.actions__search {
  display: grid;
  grid-template-columns: 12fr auto;
  column-gap: 16px;
}

.table__pagination {
  float: right;
}

@media screen and (min-width: map.get(bp.$breakpoints, "768")) {
  .contactList__actions {
    grid-auto-flow: column;
  }

  .actions__create {
    width: fit-content;
    justify-self: end;
  }
}
</style>
