import Server from './clases/server';
import userRouter from './routes/usuarios';

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

// Levantamos el servidor
server.start(() => console.log(`Server on port ${server.port}`));
