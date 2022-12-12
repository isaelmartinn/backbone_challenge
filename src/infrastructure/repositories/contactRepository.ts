import type { ApiContact, Contact } from "@domain/models/Contact";
import type { Http } from "@domain/repositories/Http";
import type { ContactsRepository } from "@domain/repositories/ContactsRepository";
import type { ContactDTO } from "../http/dto/ContactDTO";
import type { PaginationDTO } from "../http/dto/PaginationDTO";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const contactRepository = (client: Http): ContactsRepository => ({
  getContacts: async (page: number) => {
    const response = await client.get<ContactDTO>(`${API_BASE_URL}/contacts`, {
      page,
    });

    if (!response.isOk) return response;

    const contacts = response.data.results.map(
      (contactDTO: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        createdAt: string;
      }): Contact => ({
        id: contactDTO.id,
        name: {
          first: contactDTO.firstName,
          last: contactDTO.lastName,
        },
        email: contactDTO.email,
        phone: contactDTO.phone,
        createdAt: contactDTO.createdAt,
      })
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

    const contact: ContactDTO = {
      id: response.data.id,
      name: {
        first: response.data.firstName,
        last: response.data.lastName,
      },
      email: response.data.email,
      phone: response.data.phone,
      createdAt: response.data.createdAt,
    };

    return { ...response, data: contact };
  },

  deleteContact: async (id: string) => {
    const response = await client.delete<ContactDTO>(
      `${API_BASE_URL}/contacts/${id}`
    );

    if (!response.isOk) return response;

    const contact: ContactDTO = {
      id: response.data.id,
      name: {
        first: response.data.firstName,
        last: response.data.lastName,
      },
      email: response.data.email,
      phone: response.data.phone,
      createdAt: response.data.createdAt,
    };

    return { ...response, data: contact };
  },

  createContact: async (contact: ApiContact) => {
    const response = await client.post(`${API_BASE_URL}/contacts`, contact);

    if (!response.isOk) return response;

    const newContact: ContactDTO = {
      id: response.data.id,
      name: {
        first: response.data.firstName,
        last: response.data.lastName,
      },
      email: response.data.email,
      phone: response.data.phone,
      createdAt: response.data.createdAt,
    };

    return { ...response, data: newContact };
  },

  updateContact: async ({ id, ...contact }: ApiContact) => {
    const response = await client.put(
      `${API_BASE_URL}/contacts/${id}`,
      contact
    );

    if (!response.isOk) return response;

    const newContact: ContactDTO = {
      id: response.data.id,
      name: {
        first: response.data.firstName,
        last: response.data.lastName,
      },
      email: response.data.email,
      phone: response.data.phone,
      createdAt: response.data.createdAt,
    };

    return { ...response, data: newContact };
  },
});
