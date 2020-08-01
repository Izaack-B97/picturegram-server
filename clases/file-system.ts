import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import  fs from 'fs'; // File System
import uniqid from 'uniqid'; // Genera id's unicos

export default class FileSystem { 
    constructor () {}

    guardarImagenTemporal (file: FileUpload, userID: string) {
        // Crear carpetas
        const path = this.crearCarpetaUsuario(userID);
        
        // Nombre archivo
        const nombreArchivo = this.generarNombreUnico(file.name);
        console.log(file.name);
        console.log(nombreArchivo);
    }

    private generarNombreUnico(nombreOriginal: String) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1 ];

        const idUnico = uniqid();

        return `${idUnico}.${extension}`;
    }

    private async crearCarpetaUsuario (userID: string) {
        const pathUser = path.resolve( __dirname, '../uploads', userID ); 
        const pathUserTemp = path.resolve(pathUser, 'temp');
        const existe = fs.existsSync(pathUser);

        // console.log(pathUser);
        // console.log(pathUserTemp)

        // console.log(existe);

        // Creamos el directorio 
        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdtempSync(pathUserTemp);

            console.log(pathUser);
            console.error(pathUserTemp);
        }

        return pathUserTemp;
    }
}