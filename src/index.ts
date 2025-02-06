require("dotenv").config();
import { SERVER } from "./server/server";

const PORT = process.env.PORT;
SERVER.GET_INSTANCE().setPort(Number(PORT)).run().getServer();


