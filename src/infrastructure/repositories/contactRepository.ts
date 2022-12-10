import type { Contact } from "@domain/models/Contact";
import type { Http } from "@domain/repositories/Http";
import type { ContactsRepository } from "@domain/repositories/ContactsRepository";
import type { ContactDTO } from "../http/dto/ContactDTO";

export const contactRepository = (client: Http): ContactsRepository => ({
  getContacts: async () => {
    const response = await client.get<ContactDTO>(
      `${import.meta.env.VITE_API_BASE_URL}/contacts`
    );

    const contactsDTO = response.results.map(
      (contactDTO: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
      }): Contact => ({
        id: contactDTO.id,
        name: {
          first: contactDTO.firstName,
          last: contactDTO.lastName,
        },
        email: contactDTO.email,
        phone: contactDTO.phone,
      })
    );

    return { ...response, results: contactsDTO };
  },
});
