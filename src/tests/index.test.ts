import { User, UserResource } from "../types/users";
import { uuidRegex } from "../utils/url";
import { getRequest, postRequest } from "./request";

const DEFAULT_PORT = 4000;
const PORT = +(process.env.PORT || DEFAULT_PORT);

const hostname = `http://localhost:${PORT}`;
const path = "/api/users";
const user: User = {
  username: "Username",
  age: 22,
  hobbies: [],
};

describe("GET method", () => {
  let userId: string = "";

  beforeAll(() => {
    userId = "";
  });

  test("Get '/api/users' should return an empty array", async () => {
    try {
      const result = await getRequest(`${hostname}${path}`);

      expect(result).toStrictEqual([]);
    } catch (err) {
      console.log(err);
    }
  });

  test("Post '/api/users' should return user with id", async () => {
    try {
      const userResource: UserResource = await postRequest(
        { host: "localhost", port: PORT, path },
        JSON.stringify(user)
      );

      const { id, ...newUser } = userResource;

      userId = id;

      expect(user).toMatchObject(newUser);
      expect(id).toMatch(uuidRegex);
    } catch (err) {
      console.log(err);
    }
  });

  test("Get '/api/users/:id' after post should return user with id", async () => {
    try {
      const userResource = await getRequest(`${hostname}${path}/${userId}`);

      const { id, ...newUser } = userResource as UserResource;

      expect(user).toMatchObject(newUser);
      expect(id).toMatch(uuidRegex);
    } catch (err) {
      console.log(err);
    }
  });

  test("Get '/api/users' after post should return an array with user", async () => {
    try {
      const result = await getRequest(`${hostname}${path}`);

      expect(result).toStrictEqual([{ ...user, id: userId }]);
    } catch (err) {
      console.log(err);
    }
  });

  test("Get '/api/users/:id' with incorrect id should return an error with 'Not found' message", async () => {
    try {
      const error = await getRequest(`${hostname}${path}/wrongId`);

      expect(error).toMatchObject({ message: "Not found" });
    } catch (err) {
      console.log(err);
    }
  });
});
