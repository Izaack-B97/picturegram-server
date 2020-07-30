import  { Router, Response } from 'express';
import { verficaToken } from '../middlewars/autenticacion';
import Post from '../models/post.model';

const postRoutes = Router();

// Obtener posts paginados
postRoutes.get('/', async (req: any, res: Response) => {
    
    /**
     * Los query params son opcionales y se representan de la siguiente manera:
     * http://localhost/posts/?pagina=2
     */
    let pagina = Number(req.query.pagina) || 1; // En caso de que el usuario no mande la pagina mandamos la 1
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post
                        .find()
                        .sort({_id: -1 }) // Lo ordena de manera descendente el id con el -1
                        .limit(10) // Limitamos la consulta solo a unos 10 registros
                        .skip(skip)
                        .populate('usuario', '-password') // Traemos la referencia
                        .exec(); // Ejecutamos la sentencia 
                           
    res.json({
        ok: true,
        pagina: pagina,
        posts: posts
    });
});

// Crear posts
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