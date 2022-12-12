<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import type { Contact } from "@domain/models/Contact";
import { contactService } from "@domain/services/Contact.service";

import ContactView from "@templates/Contacts/ContactView.vue";

const router = useRouter();
const route = useRoute();

const contactId = ref<string | string[]>("");
const btnOptions = ref<{ isLoading: boolean }>({
  isLoading: false,
});

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

const handleDeleteContact = async () => {
  btnOptions.value.isLoading = true;

  const response = await contactService.deleteContact(contact.value.id);

  btnOptions.value.isLoading = false;

  ElMessage({
    type: "success",
    message: `Contact ${response.name.first} ${response.name.last} deleted`,
  });

  router.push({ name: "home" });
};
</script>

<template>
  <contact-view
    actions
    :contact="contact"
    :loading="isLoading"
    :btn-options="btnOptions"
    @on-click-go-back="handleGoBack"
    @on-click-delete-contact="handleDeleteContact"
  ></contact-view>
</template>
