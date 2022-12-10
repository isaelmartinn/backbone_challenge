<script setup lang="ts">
import type { Contact } from "@/domain/models/Contact";

interface Props {
  contacts: Contact[];
}

const props = defineProps<Props>();

const columns = [
  {
    title: "name",
    render(row: any) {
      return `${row.name.first} ${row.name.last}`;
    },
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Phone",
    key: "phone",
  },
  {
    title: "Created At",
    key: "createdAt",
  },
];
</script>

<template>
  <main>
    <n-data-table :columns="columns" :data="props.contacts" :bordered="false" />
  </main>
</template>
