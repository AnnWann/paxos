import { Request, Response } from 'express'

type client_update = {
  req: Request
  res: Response
  f: (x: number) => number
  time_stamp: number
}

export default client_update