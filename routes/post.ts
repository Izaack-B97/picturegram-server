import  { Router, Response } from 'express';
import { verficaToken } from '../middlewars/autenticacion';
import Post from '../models/post.model';

const postRoutes = Router();

postRoutes.post('/', [ verficaToken ], (req: any, res: Response) => {
    const data = req.body;
    data.usuario = req.usuario._id;

    Post.create(data)
        .then(async postDB => {
            /**
             * La funcion populate devuelve una promesa, sin embargo te trae toda
             * la informacion de la coleccion hacia donde esta apuntando en el primer parametro,
             * el segundo parametro quitara los campos que no se requieran
             */
            await postDB.populate('usuario', '-password').execPopulate();

            res.json({
                ok: true,
                post: postDB
            });
        })
        .catch(err => {
            res.json({
                ok: false,
                error: err
            });
        })

    
});

export default postRoutes;