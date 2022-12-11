export interface ContactsRepository {
  getContacts: (page: number) => Promise<any>;

  getContact: (id: string | string[]) => Promise<any>;

  deleteContact: (id: string) => Promise<any>;
}
