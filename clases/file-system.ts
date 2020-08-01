import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import  fs from 'fs'; // File System
import uniqid from 'uniqid'; // Genera id's unicos

export default class FileSystem { 
    constructor () {}

    guardarImagenTemporal (file: FileUpload, userID: string) {

        return new Promise((resolve, reject) => {
            const ruta = this.crearCarpetaUsuario(userID);
            // Crear carpetas
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
        const pathUserTemp = path.resolve(pathUser, 'temp');
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
}