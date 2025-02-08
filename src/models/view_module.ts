import { Request, Response } from 'express'

type View_module = {
  req: Request
  res: Response
  f: (x: number) => number
}

export default View_module