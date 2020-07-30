"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const configSchema = {
    created: { type: Date },
    mensaje: { type: String },
    img: [{ type: String }],
    coords: { type: String },
    usuario: {
        // Mantendremos una relacion con usuario
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
};
const postSchema = new mongoose_1.Schema(configSchema);
// Se dispara antes de que se guarde en la bd
postSchema.pre('save', function (next) {
    this.created = new Date(); // Definimos la fecha automatica
    next(); // Le dice que continue con el guardado del registro
});
;
const Post = mongoose_1.model('Post', postSchema);
exports.default = Post;
