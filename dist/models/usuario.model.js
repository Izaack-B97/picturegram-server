"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Configuramos las propiedades del schema
const configSchema = {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    avatar: { type: String, default: 'av-1.png' },
    email: { type: String, unique: true, required: [true, 'El email es onligatorio'] },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] }
};
// Declaramos el schema
const usuarioSchema = new mongoose_1.Schema(configSchema);
// Comparamos contraseñas
usuarioSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
;
// Creamos el modelo
const Usuario = mongoose_1.model('Usuario', usuarioSchema);
exports.default = Usuario;
