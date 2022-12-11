<script setup lang="ts">
import { useRouter } from "vue-router";

import ContactCreate from "@templates/Contacts/ContactCreate.vue";

const router = useRouter();

const handleGoBack = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <contact-create @on-click-go-back="handleGoBack"></contact-create>
</template>
