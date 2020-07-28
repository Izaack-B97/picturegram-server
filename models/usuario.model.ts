import { Schema, model, Document } from 'mongoose';

// Configuramos las propiedades del schema
const configSchema = {
    nombre: { type: String, required: [true, 'El nombre es obligatorio']},
    avatar: { type: String, default: 'av-1.png' },
    email: { type: String, unique: true, required: [true, 'El email es onligatorio']},
    password: { type: String, required: [true, 'La contraseña es obligatoria'] }
}

// Interface que nos ayudara con el tipado de datos en typescript
interface IUsuario extends Document {
    nombre: String, 
    email: String, 
    password: String,
    avatar: String
};

const usuarioSchema = new Schema(configSchema);
const Usuario = model<IUsuario>('usuario', usuarioSchema);

export default Usuario;