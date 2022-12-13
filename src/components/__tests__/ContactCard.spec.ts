import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import ContactCard from "@organisms/Contacts/ContactCard.vue";

const CONTACT_MOCK = {
  phone: "4414377051",
  name: "Sandy Emmerich",
  email: "Lexus97@gmail.com",
  createdAt: "2022-05-22T21:03:45.345Z",
  createdAtFormatted: "22/05/2022",
};

describe("Contact card", () => {
  it("renders properly", () => {
    const wrapper = mount(ContactCard, {
      props: {
        name: CONTACT_MOCK.name,
        email: CONTACT_MOCK.email,
        phone: CONTACT_MOCK.phone,
        createdAt: CONTACT_MOCK.createdAt,
      },
    });

    expect(wrapper.text()).toContain(CONTACT_MOCK.name);
    expect(wrapper.text()).toContain(CONTACT_MOCK.email);
    expect(wrapper.text()).toContain(CONTACT_MOCK.phone);
    expect(wrapper.text()).toContain(CONTACT_MOCK.createdAtFormatted);
  });
});
