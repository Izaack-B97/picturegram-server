import { Router, Request, Response } from 'express'; 
import Usuario from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../clases/token';
import { verficaToken } from '../middlewars/autenticacion';
import chalk from 'chalk';

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


// Actualizar usuario 
userRouter.put('/update', verficaToken ,(req: any, res: Response) => {
    const id = req.usuario._id;

    const data = {
        nombre : req.body.nombre || req.usuario.nombre,
        email  : req.body.email  || req.usuario.email,
        avatar : req.body.avatar || req.usuario.avatar
    }

    // console.log(data)

    // findByIdAndUpdate(id, datos a actualizar, {new: true} obtiene la info actualizada despues de la insercion)
    Usuario.findByIdAndUpdate(id, data, { new: true }, (err, userDB) => {
        // Error de la db
        if (err) {
            console.log(chalk.blue('Hola'));
            throw err
        };
        // Si el usuario no existe
        if(!userDB) {
            return res.json({
                ok: false, 
                message: 'No existe un usuario con ese id'
            });
        }

        // Si todo sale bien y se actualiza generamos el nuevo token con la info nueva
        const userToken = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: userToken
        });
    });
});

export default userRouter;