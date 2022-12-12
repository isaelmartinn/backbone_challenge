import type { ApiContact } from "@domain/models/Contact";
import type { Http } from "@domain/repositories/Http";
import type { ContactsRepository } from "@domain/repositories/ContactsRepository";
import type { ContactDTO } from "../http/dto/ContactDTO";
import type { PaginationDTO } from "../http/dto/PaginationDTO";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const contact2Dto = (contact: ApiContact): ContactDTO => {
  return {
    id: contact?.id || "",
    name: {
      first: contact.firstName,
      last: contact.lastName,
    },
    email: contact.email,
    phone: contact.phone,
    createdAt: contact.createdAt,
  };
};

export const contactRepository = (client: Http): ContactsRepository => ({
  getContacts: async (page: number) => {
    const response = await client.get<ContactDTO>(`${API_BASE_URL}/contacts`, {
      page,
    });

    if (!response.isOk) return response;

    const contacts = response.data.results.map((contact: ApiContact) =>
      contact2Dto(contact)
    );

    const pagination: PaginationDTO = {
      count: response.data.count,
      perPage: response.data.perPage,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };

    return { ...response, data: { ...pagination, results: contacts } };
  },

  getContact: async (id: string | string[]) => {
    const response = await client.get<ContactDTO>(
      `${API_BASE_URL}/contacts/${id}`
    );

    if (!response.isOk) return response;

    const contactDto = contact2Dto(response.data);

    return { ...response, data: contactDto };
  },

  deleteContact: async (id: string) => {
    const response = await client.delete<ContactDTO>(
      `${API_BASE_URL}/contacts/${id}`
    );

    if (!response.isOk) return response;

    const contactDto = contact2Dto(response.data);

    return { ...response, data: contactDto };
  },

  createContact: async (contact: ApiContact) => {
    const response = await client.post(`${API_BASE_URL}/contacts`, contact);

    if (!response.isOk) return response;

    const contactDto = contact2Dto(response.data);

    return { ...response, data: contactDto };
  },

  updateContact: async ({ id, ...contact }: ApiContact) => {
    const response = await client.put(
      `${API_BASE_URL}/contacts/${id}`,
      contact
    );

    if (!response.isOk) return response;

    const contactDto = contact2Dto(response.data);

    return { ...response, data: contactDto };
  },
});
