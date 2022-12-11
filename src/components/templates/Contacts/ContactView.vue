<script setup lang="ts">
import { computed } from "vue";
import type { Contact } from "@domain/models/Contact";
import { ElMessage, ElMessageBox } from "element-plus";

import ContactCard from "@organisms/Contacts/ContactCard.vue";

type BtnOptions = {
  isLoading: boolean;
};

interface Props {
  contact: Contact;
  loading?: boolean;
  actions?: boolean;
  btnOptions?: BtnOptions;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "on-click-go-back"): void;
  (e: "on-click-delete-contact", id: string): void;
}>();

const contactFullName = computed(() => {
  return `${props.contact.name.first} ${props.contact.name.last}`;
});

const openConfirmationDialog = () => {
  ElMessageBox.confirm(
    `The next contact ${contactFullName.value} will be deleted. Continue?`,
    "Delete contact",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => emit("on-click-delete-contact", props.contact.id))
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<template>
  <main class="contactView">
    <el-page-header @back="emit('on-click-go-back')">
      <template #content>
        <h1 class="contactView__title">View contact</h1>
      </template>
    </el-page-header>

    <contact-card
      :loading="loading"
      :name="contactFullName"
      :email="props.contact.email"
      :phone="props.contact.phone"
      :created-at="props.contact.createdAt"
    ></contact-card>

    <section v-if="props.actions" class="contactView__actions">
      <el-button
        :loading="props.btnOptions?.isLoading"
        size="large"
        type="danger"
        @click="openConfirmationDialog"
      >
        Delete
      </el-button>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "@sass/fonts" as fonts;

.contactView,
.contactView__actions {
  display: grid;
}

.contactView {
  width: min(100%, 800px);
  margin: 50px auto 0 auto;
  row-gap: 30px;
}

.contactView__title {
  font: map.get(fonts.$paragraph, "medium");
}

.contactView__actions {
  justify-content: end;
}
</style>
