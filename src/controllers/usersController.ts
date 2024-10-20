import { IncomingMessage, ServerResponse } from "node:http";
import { userService } from "../services/usersService";
import { response } from "../utils/response";
import { User } from "../types/users";
import { getRequestBody } from "../utils/requestBody";
import { v4 as uuid } from "uuid";
import { getNotFoundResponseBody, isUserObjectValid } from "./helpers";
import { getUuidFromString } from "../utils/url";

export const getUsers = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const users = userService.getUsers();

    response(res, { data: users });
  } catch (err) {
    response(res, { status: 400, data: { message: err } });
  }
};

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const currentUrl = req.url || "";
    const userId = getUuidFromString(currentUrl)?.[0];

    const users = userService.getUsers();
    const user = users.find((user) => user.id === userId);

    if (user) {
      response(res, { data: user });
    } else {
      response(
        res,
        getNotFoundResponseBody("User with provided id is not exist")
      );
    }
  } catch (err) {
    response(res, { status: 400, data: { message: err } });
  }
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const body: User = await getRequestBody(req);

    if (!isUserObjectValid(body)) {
      return response(res, {
        data: { message: "Bad request" },
        status: 400,
      });
    }

    const users = userService.getUsers();
    const foundUser = users.find((user) => user.username === body.username);

    if (foundUser) {
      return response(res, {
        data: { message: `'${body.username}' already exists!` },
        status: 409,
      });
    }

    body.id = uuid();
    users.push(body);

    userService.setUsers(users);

    response(res, { data: body, status: 201 });
  } catch (err) {
    response(res, { status: 400, data: { message: err } });
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const body: User = await getRequestBody(req);
    const currentUrl = req.url || "";
    const userId = getUuidFromString(currentUrl)?.[0];

    if (!isUserObjectValid(body) || !userId) {
      return response(res, {
        data: { message: "Bad request" },
        status: 400,
      });
    }

    const users = userService.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return response(
        res,
        getNotFoundResponseBody("User with provided id is not exist")
      );
    }

    const newUser = { ...body, id: users[userIndex].id };

    userService.updateUser(newUser, userIndex);

    response(res, { data: newUser, status: 201 });
  } catch (err) {
    response(res, { status: 400, data: { message: err } });
  }
};

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const currentUrl = req.url || "";
    const userId = getUuidFromString(currentUrl)?.[0];

    const users = userService.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      userService.deleteUser(userIndex);
      response(res, {});
    } else {
      response(
        res,
        getNotFoundResponseBody("User with provided id is not exist")
      );
    }
  } catch (err) {
    response(res, { status: 400, data: { message: err } });
  }
};
