import { Router, Request, Response } from 'express'; 

const userRouter = Router();

userRouter.get('/prueba', (req: Request, res: Response) => {
    res.json({
        ok: true, 
        message: 'Todo funciona bien'
    });
});

export default userRouter;