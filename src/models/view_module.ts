import { Request, Response } from 'express'

type View_module = {
  req: Request
  res: Response
  f: (x: number) => number
  time_stamp: number
}

export default View_module