import { Router, Request, Response } from 'express'; 
import Usuario from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../clases/token';

const userRouter = Router();

// Login
userRouter.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    
    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;
        
        if (!userDB) {
            return res.json({
                ok: false, 
                message: 'Usuario/Contraseña no son correctos'
            });
        }

        if(userDB.compararPassword(body.password)) { 
            // Generamos el token
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });

        } else {
            return res.json({
                ok: false, 
                message: 'Usuario/Contraseña no son correctos ****'
            });
        }

    });
})  

// Crear un usuario
userRouter.post('/create', (req: Request, res: Response) => {
    const user: { nombre: String, email: String, password: String, avatar: String} = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    
    Usuario.create(user)
        .then(userDB => {
            
            // Generamos el token
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });
        })
        .catch( err => {
            res.json({
                ok: false,
                err
            })
        });
});

export default userRouter;