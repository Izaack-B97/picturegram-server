"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
            res.json({
                ok: true,
                token: 'asahdsahfusadjsaoidu3f74tr7ysff7r47fuhkjsjf$$t4jhfj'
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
        res.json({
            ok: true,
            userDB
        });
    })
        .catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = userRouter;
