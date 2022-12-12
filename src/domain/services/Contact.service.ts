import { httpAxios } from "@infrastructure/instances/httpAxios";
import { contactRepository } from "@infrastructure/repositories/contactRepository";
import type { ApiContact } from "../models/Contact";

export const contactService = {
  getContacts: (page: number = 1) => {
    return contactRepository(httpAxios).getContacts(page);
  },

  getContact: (id: string | string[]) => {
    return contactRepository(httpAxios).getContact(id);
  },

  deleteContact: (id: string) => {
    return contactRepository(httpAxios).deleteContact(id);
  },

  createContact: (contact: ApiContact) => {
    return contactRepository(httpAxios).createContact(contact);
  },

  updateContact: (contact: ApiContact) => {
    return contactRepository(httpAxios).updateContact(contact);
  },
};
