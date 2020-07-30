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
const postRoutes = express_1.Router();
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
exports.default = postRoutes;
