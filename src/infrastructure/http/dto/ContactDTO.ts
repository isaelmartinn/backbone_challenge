type Name = {
  first: string;
  last: string;
};

export interface ContactDTO {
  id: string;
  name: Name;
  email: string;
  phone: string;
}
