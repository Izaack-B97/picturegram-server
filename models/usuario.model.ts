import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Configuramos las propiedades del schema
const configSchema = {
    nombre: { type: String, required: [true, 'El nombre es obligatorio']},
    avatar: { type: String, default: 'av-1.png' },
    email: { type: String, unique: true, required: [true, 'El email es onligatorio']},
    password: { type: String, required: [true, 'La contraseña es obligatoria'] }
}

// Declaramos el schema
const usuarioSchema = new Schema(configSchema);

// Comparamos contraseñas
usuarioSchema.method('compararPassword', function(password: string = ''): boolean {
    if(bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});

// Interface que nos ayudara con el tipado de datos en typescript
interface IUsuario extends Document {
    nombre: String, 
    email: String, 
    password: String,
    avatar: String,

    compararPassword(password: String): boolean;
};

// Creamos el modelo
const Usuario = model<IUsuario>('Usuario', usuarioSchema);

export default Usuario;