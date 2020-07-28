"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Configuramos las propiedades del schema
const configSchema = {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    avatar: { type: String, default: 'av-1.png' },
    email: { type: String, unique: true, required: [true, 'El email es onligatorio'] },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] }
};
;
const usuarioSchema = new mongoose_1.Schema(configSchema);
const Usuario = mongoose_1.model('usuario', usuarioSchema);
exports.default = Usuario;
