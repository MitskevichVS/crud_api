import { User } from "../types/users";

type UserService = {
  _users: User[];
  getUsers: () => User[];
  setUsers: (users: User[]) => void;
  updateUser: (user: User, index: number) => void;
  deleteUser: (index: number) => void;
};

export const userService: UserService = {
  _users: [],

  getUsers: () => {
    return userService._users;
  },

  setUsers: (users: User[]) => {
    userService._users = users;
  },

  updateUser: (newUser: User, index: number) => {
    userService._users.splice(index, 1, newUser);
  },

  deleteUser: (index: number) => {
    userService._users.splice(index, 1);
  },
};
