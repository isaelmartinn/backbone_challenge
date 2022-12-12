<script setup lang="ts">
import { useRouter } from "vue-router";

import ContactEdit from "@templates/Contacts/ContactEdit.vue";

const router = useRouter();

const handleGoBack = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <contact-edit @on-click-go-back="handleGoBack"></contact-edit>
</template>
