import { httpAxios } from "../../infrastructure/instances/httpAxios";
import { contactRepository } from "../../infrastructure/repositories/contactRepository";

export const contactService = {
  getContacts: () => {
    return contactRepository(httpAxios).getContacts();
  },
};
