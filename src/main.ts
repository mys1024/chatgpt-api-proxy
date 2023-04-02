import { oak, oakCors } from "./deps.ts";
import printer from "./utils/printer.ts";
import logger from "./middleware/logger.ts";
import router from "./router.ts";

const port = 80;
const app = new oak.Application();

app.use(logger());
app.use(oakCors());
app.use(router.routes(), router.allowedMethods());

app.listen({ port });
printer.info(`Listening on port ${port}`);
