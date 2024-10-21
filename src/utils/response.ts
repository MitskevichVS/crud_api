import { IncomingMessage, ServerResponse } from "node:http";

export const response = (
  res: ServerResponse<IncomingMessage>,
  { data = {}, status = 200, contentType = "application/json" }
) => {
  res.writeHead(status, { "Content-Type": contentType });
  res.write(JSON.stringify(data));
  res.end();
};
