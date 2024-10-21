import { UserResource } from "../types/users";

const http = require("node:http");

export const getRequest = (url: string) => {
  return new Promise((resolve, reject) => {
    http.get(url, (response: any) => {
      let data = "";

      response.on("data", (_data: any) => {
        data += _data;
      });

      response.on("end", async () => {
        try {
          const parsedData = await JSON.parse(data);
          resolve(parsedData);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    });
  });
};

export const postRequest = (
  postOptions: {
    host: string;
    port: number;
    path: string;
  },
  postData: string
): Promise<UserResource> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    ...postOptions,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res: any) => {
      res.setEncoding("utf8");
      let data = "";

      res.on("data", (chunk: string) => {
        data += chunk;
      });
      res.on("end", async () => {
        try {
          const parsedData = await JSON.parse(data);
          resolve(parsedData);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });
    });

    req.on("error", (e: any) => {
      console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write(postData);
    req.end();
  });
};
