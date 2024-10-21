import { User } from "../types/users";

const isNotEmptyString = (value: any) =>
  typeof value === "string" && value.length;

const isNumber = (value: any) => typeof value === "number" && isFinite(value);

export const isUserObjectValid = (user: User) => {
  return (
    isNotEmptyString(user.username) &&
    isNumber(user.age) &&
    user.hobbies?.every((val) => isNotEmptyString(val))
  );
};

export const getNotFoundResponseBody = (message?: string) => ({
  status: 404,
  data: { message: message || "Not found" },
});
