<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { Contact } from "@domain/models/Contact";
import { contactService } from "@domain/services/Contact.service";

import ContactCreate from "@templates/Contacts/ContactCreate.vue";

const router = useRouter();
const route = useRoute();

const contactId = ref<string | string[]>("");

let isLoading = ref<boolean>(false);
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
</script>

<template>
  <contact-create
    title="Edit contact"
    primary-btn-label="Edit"
    :contact-to-edit="contact"
    :loading="isLoading"
    @on-click-go-back="handleGoBack"
  ></contact-create>
</template>
