"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs")); // File System
const uniqid_1 = __importDefault(require("uniqid")); // Genera id's unicos
class FileSystem {
    constructor() { }
    guardarImagenTemporal(file, userID) {
        return new Promise((resolve, reject) => {
            const ruta = this.crearCarpetaUsuario(userID);
            // Crear carpetas
            //   console.log(ruta);
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Ruta final donde se guardara la imagen
            const endpoint = path_1.default.resolve(ruta, nombreArchivo);
            // Mover el archivo de la carpeta Temp a nuestra carpeta
            file.mv(endpoint, (err) => {
                if (err) {
                    // No se pudo mover
                    // console.log(path)
                    reject(err);
                }
                else {
                    // Todo salio bien
                    resolve();
                }
            });
        });
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userID) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', userID);
        const pathUserTemp = path_1.default.resolve(pathUser, 'temp');
        const existe = fs_1.default.existsSync(pathUser);
        // console.log(pathUser);
        // console.log(pathUserTemp)
        // console.log(existe);
        // Creamos el directorio 
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
