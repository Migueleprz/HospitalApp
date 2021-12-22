'use strict'

const {response, request} = require('express');
const Usuario = require('../models/modeloUsuario');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt')

const Login = async ( req = request, res = response)=>{
    try{
        const {email, password} = req.body;

        /*verificar email*/
        const user = await Usuario.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                ok: false,
                msg:'Credenciales invalidas'
            });
        }

        /*verificar cotraseña*/
        const okpassword = bcrypt.compareSync(password, user.password);
        if(!okpassword)
        {
            return res.status(400).json({
                ok: false,
                msg:'Credenciales invalidas'
            });
        }

        /*generar el JWT*/
        const token = await generateJWT(user.id)

        res.status(200).json({
            ok:true,
            token
        })
    } catch (e) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado...',
            e
        });
    }
}

module.exports = {
Login
}