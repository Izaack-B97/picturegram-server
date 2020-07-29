"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const autenticacion_1 = require("../middlewars/autenticacion");
const chalk_1 = __importDefault(require("chalk"));
const userRouter = express_1.Router();
// Login
userRouter.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.default.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                message: 'Usuario/Contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            // Generamos el token
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                message: 'Usuario/Contraseña no son correctos ****'
            });
        }
    });
});
// Crear un usuario
userRouter.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.default.create(user)
        .then(userDB => {
        // Generamos el token
        const tokenUser = token_1.default.getJwtToken({
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
        .catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Actualizar usuario 
userRouter.put('/update', autenticacion_1.verficaToken, (req, res) => {
    const id = req.usuario._id;
    const data = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    // console.log(data)
    // findByIdAndUpdate(id, datos a actualizar, {new: true} obtiene la info actualizada despues de la insercion)
    usuario_model_1.default.findByIdAndUpdate(id, data, { new: true }, (err, userDB) => {
        // Error de la db
        if (err) {
            console.log(chalk_1.default.blue('Hola'));
            throw err;
        }
        ;
        // Si el usuario no existe
        if (!userDB) {
            return res.json({
                ok: false,
                message: 'No existe un usuario con ese id'
            });
        }
        // Si todo sale bien y se actualiza generamos el nuevo token con la info nueva
        const userToken = token_1.default.getJwtToken({
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
exports.default = userRouter;
