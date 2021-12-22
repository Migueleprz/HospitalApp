'use strict'



const {response, request} = require('express');
const Usuario = require('../models/modeloUsuario');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt')

const Create = async (req = request, res = response) =>
{
    const {nombre, email, password, status} = req.body;

    try{

        const userData = await Usuario.findOne({email});
        if(userData){
            return res.status(400).json({
                ok:false,
                msg:'El email ya existe!!!'
            });
        }

        const nombreExist = await Usuario.findOne({nombre});
        if(nombreExist){
            return res.status(400).json({
                ok:false,
                msg:'El nombre de usuario ya existe!!!'
            });
        }

        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        const token = await generateJWT(usuario.uid);
        res.status(200).json({
            ok:true,
            token
        });
    }
    catch (e) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado...',
            e
        });
    }



}

const Read = async (req = request, res = response) =>
{

  try{
      const usuarios = await Usuario.find({},'nombre email status role authGoogle');
      res.json({
          ok:true, usuarios
      });
  }catch (e) {
    res.status(500).json({
          ok:false, e
      });
  }


}

const Update = async (req = request, res = response) =>
{
    /*se obtiene el id de la url*/
    let uid = req.params.id;

    try{
        /*se comprueba si existe el usuario */
        const user = await Usuario.findById(uid);
        if(!user)
        {
            res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            });
        }
        const {password,authGoogle,email, ...campos} = req.body;

        if(user.email !== email)
        {
            const emailEsist = await Usuario.findOne({email});
            if(emailEsist)
            {
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe un usuario con el email'+ req.body.email
                })
            }
        }
        campos.email = email;

        /*proceso de actualizacion*/
        await Usuario.findByIdAndUpdate(uid, campos);

        res.status(200).json({
            ok:true,
            msg:'Usuario Actualizado'
        });
    }
    catch (e) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado...',
            e
        });
    }
}

const Delete = async (req = request, res = response) =>
{
    const uid = req.params.id;
    const user = await Usuario.findById(uid);
    if(!user)
    {
        res.status(404).json({
            ok:false,
            msg:'Usuario no encontrado'
        });
    }
    await Usuario.findByIdAndDelete(uid);
    res.status(200).json({
        ok:true,
        msg:'Usuario eliminado!'
    })
}

const ReadByUid = async (req = request, res = response) =>
{

}

const ReadByEmail = async (req, res) =>
{

}

module.exports = {
    Create, Read, Update, Delete, ReadByUid, ReadByEmail
}