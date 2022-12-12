<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import type { ApiContact, Contact } from "@domain/models/Contact";
import { contactService } from "@domain/services/Contact.service";

import ContactCreate from "@templates/Contacts/ContactCreate.vue";

const router = useRouter();
const route = useRoute();

const contactId = ref<string | string[]>("");

let isLoading = ref<boolean>(false);
let isDisabled = ref<boolean>(false);
let contact = ref<Contact>({
  id: "",
  name: {
    first: "",
    last: "",
  },
  email: "",
  phone: "",
  createdAt: "",
});

onMounted(async () => {
  isLoading.value = true;
  contactId.value = route.params.id;

  const { isOk, data } = await contactService.getContact(contactId.value);

  isLoading.value = false;

  if (!isOk) return;

  contact.value = data;
});

const handleGoBack = () => {
  router.push({ name: "home" });
};

const handleSubmit = async (contact: ApiContact) => {
  isLoading.value = true;
  isDisabled.value = true;

  const { isOk, data } = await contactService.updateContact(contact);

  isLoading.value = false;
  isDisabled.value = false;

  if (!isOk) return;

  ElMessage({
    type: "success",
    message: `Contact ${data.name.first} ${data.name.last} updated`,
  });
};
</script>

<template>
  <contact-create
    title="Edit contact"
    primary-btn-label="Edit"
    :loading="isLoading"
    :disabled="isDisabled"
    :contact-to-edit="contact"
    @on-click-go-back="handleGoBack"
    @on-submit="handleSubmit({ id: contact.id, ...$event })"
  ></contact-create>
</template>
