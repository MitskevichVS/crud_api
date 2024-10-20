const uuidRegex =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/i;

export const isUsersResourceUrl = (url: string) => url.startsWith("/api/users");

export const getUuidFromString = (url: string) => url.match(uuidRegex);

export const replaceUuidWithKey = (url: string, key: string) =>
  url.replace(uuidRegex, key);

export const isValidUrlWithId = (url: string) =>
  isUsersResourceUrl(url) && getUuidFromString(url)?.length;
