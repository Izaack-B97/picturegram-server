import Server from './clases/server';
import userRouter from './routes/usuarios';
import mongoose from 'mongoose';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

/**
 * express: Servidor web
 * body-parser: Recibe los datos de una peticion post y lo convierte en un json
 * cors: Puede hacer peticiones cross domain
 * moongose: Te permite interactuar con la db
 * express-fileupload: Permite recibir peticiones de archivos
 * jsonwebtokens: Es para la autenticacion de la app
 * bcrypt: Encripta las contraseñas de los usuarios
 */

// Inicializamos la clase servidor
const server = new Server();
 
// Middlewars
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Routes
server.app.get('/', (req: Request, res: Response) => res.json('Bienvenido a servicios rest de picturegram'));
server.app.use('/user', userRouter)

// Conectar con la bd
mongoose.connect('mongodb://localhost:27017/picturesgram', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(result => {
        console.log(chalk.blue('CONECCTION SUCCESSFULLY TO DATABASE'))
        // console.log(result);
    })
    .catch(err => {
        throw chalk.red('Error to conecction database: ' + err);
    });

// Levantamos el servidor
server.start(() => console.log(`Server on port ${server.port}`));
