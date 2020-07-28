"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
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
const server = new server_1.default();
// Routes
server.app.use('/user', usuarios_1.default);
// Levantamos el servidor
server.start(() => console.log(`Server on port ${server.port}`));
