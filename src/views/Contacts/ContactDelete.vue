<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { Contact } from "@domain/models/Contact";
import { contactService } from "@domain/services/Contact.service";

import ContactView from "@templates/Contacts/ContactView.vue";

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

  const response = await contactService.getContact(contactId.value);
  contact.value = response;

  isLoading.value = false;
});

const handleGoBack = () => {
  router.push({ name: "home" });
};

const handleDeleteContact = () => {};
</script>

<template>
  <contact-view
    actions
    :contact="contact"
    :loading="isLoading"
    @on-click-go-back="handleGoBack"
    @on-click-delete-contact="handleDeleteContact"
  ></contact-view>
</template>
