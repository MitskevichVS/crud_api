import { IncomingMessage, ServerResponse } from "node:http";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/usersController";

type HttpMethodsMapperItem = {
  [key: string]: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ) => void;
};

type HttpMethodsMapper = {
  [key: string]: HttpMethodsMapperItem;
};

export enum HTTPMethods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

export const httpMethodsMapper: HttpMethodsMapper = {
  "/api/users": {
    [HTTPMethods.GET]: getUsers,
    [HTTPMethods.POST]: createUser,
  },
  "/api/users/:id": {
    [HTTPMethods.GET]: getUser,
    [HTTPMethods.PUT]: updateUser,
    [HTTPMethods.DELETE]: deleteUser,
  },
};
