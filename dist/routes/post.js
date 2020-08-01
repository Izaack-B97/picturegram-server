"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewars/autenticacion");
const post_model_1 = __importDefault(require("../models/post.model"));
const file_system_1 = __importDefault(require("../clases/file-system"));
const postRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
// Obtener posts paginados
postRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Los query params son opcionales y se representan de la siguiente manera:
     * http://localhost/posts/?pagina=2
     */
    let pagina = Number(req.query.pagina) || 1; // En caso de que el usuario no mande la pagina mandamos la 1
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_model_1.default
        .find()
        .sort({ _id: -1 }) // Lo ordena de manera descendente el id con el -1
        .limit(10) // Limitamos la consulta solo a unos 10 registros
        .skip(skip)
        .populate('usuario', '-password') // Traemos la referencia
        .exec(); // Ejecutamos la sentencia 
    res.json({
        ok: true,
        pagina: pagina,
        posts: posts
    });
}));
// Crear posts
postRoutes.post('/', [autenticacion_1.verficaToken], (req, res) => {
    const data = req.body;
    data.usuario = req.usuario._id;
    post_model_1.default.create(data)
        .then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * La funcion populate devuelve una promesa, sin embargo te trae toda
         * la informacion de la coleccion hacia donde esta apuntando en el primer parametro,
         * el segundo parametro quitara los campos que no se requieran
         */
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    }))
        .catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
});
// Servicio para subir archivos
postRoutes.post('/upload', [autenticacion_1.verficaToken], (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se subio ningun archivo'
        });
    }
    const file = req.files.image;
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
    fileSystem.guardarImagenTemporal(file, userID);
    res.json({
        ok: true,
        file: file.mimetype
    });
});
exports.default = postRoutes;
