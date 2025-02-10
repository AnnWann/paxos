import { Request, Response } from "express";
import View_module from "./view_module";


type Server_message = {
  server_id: number,
  view: View_module,
  aru: number,
}

export default Server_message;