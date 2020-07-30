"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const post_1 = __importDefault(require("./routes/post"));
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
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
/*****  Middlewars   *****/
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload -> Los guardara en req.files
server.app.use(express_fileupload_1.default());
// Routes
server.app.use('/user', usuarios_1.default);
server.app.use('/posts', post_1.default);
// Conectar con la bd
mongoose_1.default.connect('mongodb://localhost:27017/picturesgram', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(result => {
    console.log(chalk_1.default.blue('CONECCTION SUCCESSFULLY TO DATABASE'));
    // console.log(result);
})
    .catch(err => {
    throw chalk_1.default.red('Error to conecction database: ' + err);
});
// Levantamos el servidor
server.start(() => console.log(`Server on port ${server.port}`));
