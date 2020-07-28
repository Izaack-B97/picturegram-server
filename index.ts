import Server from './clases/server';
import userRouter from './routes/usuarios';
import mongoose from 'mongoose';
import chalk from 'chalk';

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
 
// Routes
server.app.use('/user', userRouter)

// Conectar con la bd
mongoose.connect('mongodb://localhost:27017/picturesgram', { useNewUrlParser: true, useCreateIndex: true })
    .then(result => {
        console.log(chalk.green('CONECCTION SUCCESSFULLY TO DATABASE'))
        // console.log(result);
    })
    .catch(err => {
        throw chalk.red('Error to conecction database: ' + err);
    });

// Levantamos el servidor
server.start(() => console.log(`Server on port ${server.port}`));
