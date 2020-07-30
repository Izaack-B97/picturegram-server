import { Schema, Document, model } from 'mongoose';

const configSchema = {
    created : { type: Date },
    mensaje: { type: String },
    img: [{ type: String }],
    coords: { type: String }, // -13.133, 123.432
    usuario: {
        // Mantendremos una relacion con usuario
        type: Schema.Types.ObjectId, // Tipo necesario para la relacion
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
}

const postSchema = new Schema(configSchema);

// Se dispara antes de que se guarde en la bd
postSchema.pre<IPost>('save', function(next) {
    this.created = new Date(); // Definimos la fecha automatica
    next(); // Le dice que continue con el guardado del registro
});

interface IPost extends Document {
    created: Date,
    mensaje: String,
    img: String[],
    coords: String,
    usuario: String
};

const Post = model<IPost>('Post', postSchema);

export default Post;
