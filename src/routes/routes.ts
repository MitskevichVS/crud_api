import { IncomingMessage, ServerResponse } from "node:http";
import { HTTPMethods, httpMethodsMapper } from "./constants";
import { response } from "../utils/response";
import {
  getUuidFromString,
  isUsersResourceUrl,
  replaceUuidWithKey,
} from "../utils/url";
import { getNotFoundResponseBody } from "../controllers/helpers";

export const router = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const { url = "", method } = req;

  if (!isUsersResourceUrl(url)) {
    return response(res, getNotFoundResponseBody());
  }

  const currentMethod = HTTPMethods[method as HTTPMethods];
  const urlKey = getUuidFromString(url)?.[0]
    ? replaceUuidWithKey(url, ":id")
    : url;
  const callback: any = httpMethodsMapper[urlKey]?.[currentMethod];

  if (callback) {
    httpMethodsMapper[urlKey]?.[currentMethod]?.(req, res);
  } else {
    response(res, getNotFoundResponseBody());
  }
};
