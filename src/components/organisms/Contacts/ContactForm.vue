<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import type { FormInstance } from "element-plus";
import type { ApiContact, Contact } from "@domain/models/Contact";

interface Props {
  loading?: boolean;
  disabled?: boolean;
  primaryBtnLabel: string;
  contactToEdit?: Contact;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "on-click-cancel"): void;
  (e: "on-submit", contact: ApiContact): void;
}>();

const formRef = ref<FormInstance>();

const createContactForm = reactive<ApiContact>({
  email: "",
  phone: "",
  lastName: "",
  firstName: "",
});

watchEffect(() => {
  if (props.contactToEdit) {
    createContactForm.email = props.contactToEdit.email;
    createContactForm.phone = props.contactToEdit.phone;
    createContactForm.lastName = props.contactToEdit.name.last;
    createContactForm.firstName = props.contactToEdit.name.first;
  }
});

const nameRules = [
  { required: true, message: "This field is required" },
  {
    min: 3,
    message: "Length should be more than 3",
  },
];
const emailRules = [
  { required: true, message: "This field is required" },
  {
    type: "email",
    message: "Please input correct email address",
  },
];
const phoneRules = [
  { len: 10, message: "Phone must be 10 digits" },
  { required: true, message: "This field is required" },
  { type: "string", pattern: "^[0-9]+$", message: "Phone must be a number" },
];

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate((valid) => {
    if (!valid) return false;

    emit("on-submit", {
      email: createContactForm.email,
      phone: createContactForm.phone,
      lastName: createContactForm.lastName,
      firstName: createContactForm.firstName,
    });
  });
};

const resetContactForm = () => {
  if (!formRef.value) return;

  formRef.value.resetFields();
};

defineExpose({
  resetContactForm,
});
</script>

<template>
  <el-form
    ref="formRef"
    :model="createContactForm"
    label-position="top"
    size="large"
    @submit.prevent="handleSubmit(formRef)"
  >
    <el-form-item label="First Name" prop="firstName" :rules="nameRules">
      <el-input
        v-model="createContactForm.firstName"
        type="text"
        autocomplete="off"
        :disabled="props.disabled"
      />
    </el-form-item>

    <el-form-item label="Last Name" prop="lastName" :rules="nameRules">
      <el-input
        v-model="createContactForm.lastName"
        type="text"
        autocomplete="off"
        :disabled="props.disabled"
      />
    </el-form-item>

    <el-form-item label="email" prop="email" :rules="emailRules">
      <el-input
        v-model="createContactForm.email"
        type="text"
        autocomplete="off"
        data-testid="email"
        :disabled="props.disabled"
      />
    </el-form-item>

    <el-form-item label="Phone" prop="phone" :rules="phoneRules">
      <el-input
        v-model="createContactForm.phone"
        type="text"
        autocomplete="off"
        :disabled="props.disabled"
      />
    </el-form-item>

    <el-form-item>
      <div class="contactForm__actions">
        <el-button @click="emit('on-click-cancel')" :disabled="props.disabled">
          Cancel
        </el-button>

        <el-button
          type="primary"
          native-type="submit"
          :loading="props.loading"
          :disabled="props.disabled"
        >
          {{ props.primaryBtnLabel }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "@sass/breakpoints" as bp;

.contactForm__actions {
  width: 100%;
  display: grid;
  gap: 16px;

  button {
    margin: 0;
  }
}

@media screen and (min-width: map.get(bp.$breakpoints, "768")) {
  .contactForm__actions {
    grid-auto-flow: column;
    justify-content: end;
  }
}
</style>
