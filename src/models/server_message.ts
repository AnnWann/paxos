import { Request, Response } from "express";


type Server_message = {
  req: Request,
  res: Response,
  server_id: number,
}

export default Server_message;