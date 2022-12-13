type Name = {
  first: string;
  last: string;
};

export type Contact = {
  id: string;
  name: Name;
  email: string;
  phone: string;
  createdAt: string;
};

export type ApiContact = {
  id?: string;
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
  createdAt?: string;
};
