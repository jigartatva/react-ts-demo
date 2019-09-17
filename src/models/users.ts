//define user object formate
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string | object;
  gender: string;
  address: string;
  bio: string;
}