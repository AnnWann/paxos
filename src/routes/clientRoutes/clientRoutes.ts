import { Request, Response, Router } from "express";
import Activity_Queue from "activity_queuer/Activity_Queue";

export default (router: Router) => {
    router.put("/somar1", (req: Request, res: Response) => {
        Activity_Queue.__GET__().addActivity(
            {
                req,
                res,
                f: (x: number) => x + 1,
                time_stamp: 0
            }
        )
    });

    router.put("/subtrair1", (req: Request, res: Response) => {
        Activity_Queue.__GET__().addActivity(
            {
                req,
                res,
                f: (x: number) => x - 1,
                time_stamp: 0
            }
        )
    });
}