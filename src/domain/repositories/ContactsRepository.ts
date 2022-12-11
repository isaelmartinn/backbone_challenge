export interface ContactsRepository {
  getContacts: (page: number) => Promise<any>;
}
