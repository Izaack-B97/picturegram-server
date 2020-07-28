import jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = 'este-es-mi-token-secreto-de-mi-app';
    private static caducidad: string = '30d';

    constructor () {}

    // Genera ej jsonwebtoken
    static getJwtToken(payload: any): string {
        return jwt.sign({ usuario: payload }, this.seed, { expiresIn: this.caducidad });
    }

    // Comparamos el token contra el que el que estamos recibiendo de la peticion contra el seed
    static comprobarToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if(err) {
                    // No confiamos en el token
                    reject(err);
                } else {
                    // Todo en orden el token es valido
                    resolve(decoded); // Dentro de decode esta toda la info del usuario que meta dentro del payload
                }
            }); 
        });
    }
}