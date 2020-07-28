import express from 'express';

export default class Server {
    public app: express.Application;
    public port:number  = 3000;

    // Inicializamos la propiedad app
    constructor() {
        this.app = express();
    }

    start(callback: () => void){
        this.app.listen(this.port, callback);
    }
} 