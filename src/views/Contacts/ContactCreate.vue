<script setup lang="ts">
import { useRouter } from "vue-router";
import type { ApiContact } from "@domain/models/Contact";

import ContactCreate from "@templates/Contacts/ContactCreate.vue";

const router = useRouter();

const handleGoBack = () => {
  router.push({ name: "home" });
};

const handleSubmit = (contact: ApiContact) => {
  console.log(contact);
};
</script>

<template>
  <contact-create
    @on-click-go-back="handleGoBack"
    @on-submit="handleSubmit"
  ></contact-create>
</template>
