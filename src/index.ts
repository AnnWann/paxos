require("dotenv").config();
import { Decision_Starter } from "decision_starter/Decision_Starter";
import { SERVER } from "./server/server";

const PORT = process.env.MY_PORT
SERVER.GET_INSTANCE().setPort(Number(PORT)).run().getServer();

// inicia decision_starter

Decision_Starter.__GET__()


