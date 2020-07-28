"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = express_1.Router();
userRouter.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        message: 'Todo funciona bien'
    });
});
exports.default = userRouter;
