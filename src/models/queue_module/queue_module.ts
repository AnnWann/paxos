import { Request, Response } from 'express'

type Queue_module = {
  req: Request
  res: Response
  f: (x: number) => number
}

export default Queue_module