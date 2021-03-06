import  { Router, Response } from 'express';
import { verficaToken } from '../middlewars/autenticacion';
import Post from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../clases/file-system';

const postRoutes = Router();
const fileSystem = new FileSystem();

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

    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    data.imgs = imagenes;

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

// Servicio para subir archivos
postRoutes.post('/upload', [verficaToken], async (req: any, res: Response) => {
    
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se subio ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    // Validamos que exista la propiedad image
    if (!file) {
        return res.json({
            ok: false,
            message: 'No se subio ningun archivo - image'
        });
    }

    // Validamos que sea una imagen lo que se sube
    if (!file.mimetype.includes('image')) {
        return res.json({
            ok: false,
            message: 'Lo que subio no es una imagen'
        });
    }

    const userID = req.usuario._id; // El userID esta en el token
    
    // Creamos la ruta de la imagen temporal
    await fileSystem.guardarImagenTemporal(file, userID);

    res.json({
        ok: true,
        file: file.mimetype
    });
})

// Ruta para mostrar las imagenes
postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {
    const userID = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl(userID, img);

    // res.json({
    //     pathFoto
    // });
    res.sendFile(pathFoto);
});

export default postRoutes;