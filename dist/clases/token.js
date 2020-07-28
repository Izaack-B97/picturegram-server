"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let Token = /** @class */ (() => {
    class Token {
        constructor() { }
        // Genera ej jsonwebtoken
        static getJwtToken(payload) {
            return jsonwebtoken_1.default.sign({ usuario: payload }, this.seed, { expiresIn: this.caducidad });
        }
        // Comparamos el token contra el que el que estamos recibiendo de la peticion contra el seed
        static comprobarToken(userToken) {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                    if (err) {
                        // No confiamos en el token
                        reject(err);
                    }
                    else {
                        // Todo en orden el token es valido
                        resolve(decoded); // Dentro de decode esta toda la info del usuario que meta dentro del payload
                    }
                });
            });
        }
    }
    Token.seed = 'este-es-mi-token-secreto-de-mi-app';
    Token.caducidad = '30d';
    return Token;
})();
exports.default = Token;
