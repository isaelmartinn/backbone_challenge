import { httpAxios } from "@infrastructure/instances/httpAxios";
import { contactRepository } from "@infrastructure/repositories/contactRepository";

export const contactService = {
  getContacts: (page: number = 1) => {
    return contactRepository(httpAxios).getContacts(page);
  },
};
