import type { Contact } from "@domain/models/Contact";
import type { Http } from "@domain/repositories/Http";
import type { ContactsRepository } from "@domain/repositories/ContactsRepository";
import type { ContactDTO } from "../http/dto/ContactDTO";
import type { PaginationDTO } from "../http/dto/PaginationDTO";

export const contactRepository = (client: Http): ContactsRepository => ({
  getContacts: async (page: number) => {
    const response = await client.get<ContactDTO>(
      `${import.meta.env.VITE_API_BASE_URL}/contacts`,
      { page }
    );

    const contacts = response.results.map(
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
      count: response.count,
      perPage: response.perPage,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
    };

    return { ...pagination, results: contacts };
  },
});
