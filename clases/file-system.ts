import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import  fs from 'fs'; // File System
import uniqid from 'uniqid'; // Genera id's unicos

export default class FileSystem { 
    constructor () {}

    guardarImagenTemporal (file: FileUpload, userID: string) {

        return new Promise((resolve, reject) => {
            const ruta = this.crearCarpetaUsuario(userID);
            //   console.log(ruta);

            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Ruta final donde se guardara la imagen
            const endpoint = path.resolve(ruta, nombreArchivo);

            // Mover el archivo de la carpeta Temp a nuestra carpeta
            file.mv(endpoint, (err: any) => {
                if (err) {
                    // No se pudo mover
                    // console.log(path)
                    reject(err);
                } else {
                    // Todo salio bien
                    resolve();
                }
            }); 
        });
    }

    private generarNombreUnico(nombreOriginal: String) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1 ];

        const idUnico = uniqid();

        return `${idUnico}.${extension}`;
    }

    private crearCarpetaUsuario (userID: string) {
        const pathUser = path.resolve( __dirname, '../uploads', userID ); 
        const pathUserTemp = path.join(pathUser, 'temp');
        const existe = fs.existsSync(pathUser);

        // console.log(pathUser);
        // console.log(pathUserTemp)

        // console.log(existe);

        // Creamos el directorio 
        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }
    
    imagenesDeTempHaciaPost(userID: string) {
        const pathTemp = path.resolve( __dirname, '../uploads', userID, 'temp' );
        const pathPost = path.resolve( __dirname, '../uploads', userID, 'posts'); 

        if (!fs.existsSync(pathTemp)) {
            return [];
        }

        if (!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userID, pathTemp);

        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`); // Las renombra y las mueve al fichero de posts
        });

        return imagenesTemp; // Retornamos los nombres de las imagenes
    }

    private obtenerImagenesEnTemp(userID: string, pathTemp: string) {
        return fs.readdirSync(pathTemp) || []; // Si no hay imagenes o no existiera mandamoria un undefined
    }

    getFotoUrl(userID: string, img: string) { 
        const pathFoto = path.resolve(__dirname, '../uploads', userID, 'posts', img);
        const existe = fs.existsSync(pathFoto);

        console.log(existe); 

        if (!existe) {
            return path.resolve(__dirname, '../assets/400x250.jpg')
        }

        return pathFoto;
    }
}