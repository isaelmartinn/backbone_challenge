<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import type { ApiContact } from "@domain/models/Contact";

interface Props {
  loading?: boolean;
  disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "on-submit", contact: ApiContact): void;
  (e: "on-click-cancel"): void;
}>();

const formRef = ref<FormInstance>();

const createContactForm = reactive<ApiContact>({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
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
  { required: true, message: "This field is required" },
  { type: "number", message: "Phone must be a number" },
];

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate((valid) => {
    if (!valid) return false;

    emit("on-submit", {
      firstName: createContactForm.firstName,
      lastName: createContactForm.lastName,
      email: createContactForm.email,
      phone: createContactForm.phone.toString(),
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
        :disabled="props.disabled"
      />
    </el-form-item>

    <el-form-item label="Phone" prop="phone" :rules="phoneRules">
      <el-input
        v-model.number="createContactForm.phone"
        type="text"
        autocomplete="off"
        :disabled="props.disabled"
      />
    </el-form-item>

    <el-form-item class="contactForm__actions">
      <el-button @click="emit('on-click-cancel')" :disabled="props.disabled">
        Cancel
      </el-button>

      <el-button
        type="primary"
        native-type="submit"
        :loading="props.loading"
        :disabled="props.disabled"
      >
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.contactForm__actions {
  float: right;
}
</style>