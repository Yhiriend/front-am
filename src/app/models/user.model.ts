export interface User {
  id?: number;
  password?: string | null;

  email: string;
  phone?: string | null;
  address?: string | null;

  name: string;
  surname: string;
  age?: number | null;
  gender?: string | null;
  //role?: string;

}
