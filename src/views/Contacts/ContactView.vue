<script setup lang="ts">
import { useRouter } from "vue-router";

import ContactView from "@templates/Contacts/ContactView.vue";

const router = useRouter();

const handleGoBack = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <contact-view @on-click-go-back="handleGoBack"></contact-view>
</template>
