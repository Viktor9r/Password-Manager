/// <reference types="react-scripts" />

type User = {
  id: number,
  login: string,
  password: string,
};

type Password = {
  id: number,
  userId: number,
  application: string,
  appLogin: string,
  appPassword: string,
};

interface UserNew extends User {
  [key: string]: string | number;
}

interface PasswordNew extends Password {
  [key: string]: string | number;
}
