import { Response, Request ,NextFunction } from 'express';
import Token from '../clases/token';

export const verficaToken = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('x-token') || '';

    Token.comprobarToken(userToken)
        .then((decoded: any) => {
            // LLegando aqui quiere decir que el token es valido
            // console.log(decoded);
            req.usuario = decoded.usuario;
            
            next();
        })
        .catch(err => {
            res.json({
                ok: false,
                message: 'Token no es correcto'
            });
        });
};