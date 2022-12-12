import type { ApiContact } from "../models/Contact";

export interface ContactsRepository {
  getContacts: (page: number) => Promise<any>;

  getContact: (id: string | string[]) => Promise<any>;

  deleteContact: (id: string) => Promise<any>;

  createContact: (contact: ApiContact) => Promise<any>;

  updateContact: (contact: ApiContact) => Promise<any>;
}
