import { IncomingMessage } from "node:http";

export const getRequestBody = (request: IncomingMessage): any => {
  return new Promise((resolve, reject) => {
    const buffer: Uint8Array[] = [];
    let result;

    request
      .on("data", (chunk) => {
        buffer.push(chunk);
      })
      .on("end", () => {
        try {
          const body = Buffer.concat(buffer).toString().trim();
          result = JSON.parse(body);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
