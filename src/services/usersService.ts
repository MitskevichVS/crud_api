import { UserResource } from "../types/users";

type UserService = {
  _users: UserResource[];
  getUsers: () => UserResource[];
  setUsers: (users: UserResource[]) => void;
  updateUser: (user: UserResource, index: number) => void;
  deleteUser: (index: number) => void;
};

export const userService: UserService = {
  _users: [],

  getUsers: () => {
    return userService._users;
  },

  setUsers: (users: UserResource[]) => {
    userService._users = users;
  },

  updateUser: (newUser: UserResource, index: number) => {
    userService._users.splice(index, 1, newUser);
  },

  deleteUser: (index: number) => {
    userService._users.splice(index, 1);
  },
};
