import { createServer } from "node:http";
import { router } from "./routes/routes";
import "dotenv/config";

const DEFAULT_PORT = 4000;
const PORT = +(process.env.PORT || DEFAULT_PORT);

export const server = createServer(router);

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
