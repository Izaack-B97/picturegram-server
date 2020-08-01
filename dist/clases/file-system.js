"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        // Crear carpetas
        const path = this.crearCarpetaUsuario(userID);
        // Nombre archivo
        const nombreArchivo = this.generarNombreUnico(file.name);
        console.log(file.name);
        console.log(nombreArchivo);
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathUser = path_1.default.resolve(__dirname, '../uploads', userID);
            const pathUserTemp = path_1.default.resolve(pathUser, 'temp');
            const existe = fs_1.default.existsSync(pathUser);
            // console.log(pathUser);
            // console.log(pathUserTemp)
            // console.log(existe);
            // Creamos el directorio 
            if (!existe) {
                fs_1.default.mkdirSync(pathUser);
                fs_1.default.mkdtempSync(pathUserTemp);
                console.log(pathUser);
                console.error(pathUserTemp);
            }
            return pathUserTemp;
        });
    }
}
exports.default = FileSystem;
