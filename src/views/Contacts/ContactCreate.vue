<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { ApiContact } from "@domain/models/Contact";
import { contactService } from "@domain/services/Contact.service";

import ContactCreate from "@templates/Contacts/ContactCreate.vue";

const router = useRouter();
const contactCreateRef = ref();

let isLoading = ref<boolean>(false);
let isDisabled = ref<boolean>(false);

const handleGoBack = () => {
  router.push({ name: "home" });
};

const handleSubmit = async (contact: ApiContact) => {
  isDisabled.value = true;
  isLoading.value = true;

  const response = await contactService.createContact(contact);

  contactCreateRef.value.contactFormRef.resetContactForm();

  isDisabled.value = false;
  isLoading.value = false;

  ElMessage({
    type: "success",
    message: `Contact ${response.name.first} ${response.name.last} created`,
  });
};
</script>

<template>
  <contact-create
    ref="contactCreateRef"
    :loading="isLoading"
    :disabled="isDisabled"
    @on-click-go-back="handleGoBack"
    @on-submit="handleSubmit"
  ></contact-create>
</template>
