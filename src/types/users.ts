export type User = {
  username: string;
  age: number;
  hobbies: string[];
};

export type UserResource = User & {
  id: string;
};
