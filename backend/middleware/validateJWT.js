'use strict'
const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const validateJWT = (req=request, res=response, next) => {

    /*obtenemos el token*/
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg:'Autorización no valida'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (e) {
        res.status(500).json({
            ok: false,
            msg:'Autorización errada.'
        });
    }

}

module.exports = {
    validateJWT
}