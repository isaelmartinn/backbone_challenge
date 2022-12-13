import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ContactForm from "@organisms/Contacts/ContactForm.vue";
import {
  ElSkeleton,
  ElForm,
  ElButton,
  ElFormItem,
  ElInput,
} from "element-plus";

const CONTACT_FORM_MOCK = {
  bntLabel: "Create",
  contact: {
    name: {
      first: "first",
      last: "last",
    },
    email: "email@gmail.com",
    phone: "3438472346",
  },
};

const wrapper = mount(ContactForm, {
  props: {
    primaryBtnLabel: CONTACT_FORM_MOCK.bntLabel,
  },
  children: [ElSkeleton, ElButton, ElForm, ElFormItem, ElInput],
});

describe("Contact form", () => {
  it("renders properly", () => {
    expect(wrapper.text()).toContain(CONTACT_FORM_MOCK.bntLabel);
  });
});

describe("Enter Data", () => {
  it("works properly", async () => {
    await wrapper.setProps({ contactToEdit: CONTACT_FORM_MOCK.contact });

    const { name, email, phone } = CONTACT_FORM_MOCK.contact;

    expect(wrapper.vm.contactToEdit?.email).toBe(email);
    expect(wrapper.vm.contactToEdit?.phone).toBe(phone);
    expect(wrapper.vm.contactToEdit?.name.last).toBe(name.last);
    expect(wrapper.vm.contactToEdit?.name.first).toBe(name.first);
  });
});
