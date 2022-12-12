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

  const { isOk, data } = await contactService.createContact(contact);

  isDisabled.value = false;
  isLoading.value = false;

  if (!isOk) return;

  contactCreateRef.value.contactFormRef.resetContactForm();

  ElMessage({
    type: "success",
    message: `Contact ${data.name.first} ${data.name.last} created`,
  });
};
</script>

<template>
  <contact-create
    title="View contact"
    ref="contactCreateRef"
    primary-btn-label="Create"
    :loading="isLoading"
    :disabled="isDisabled"
    @on-click-go-back="handleGoBack"
    @on-submit="handleSubmit"
  ></contact-create>
</template>
