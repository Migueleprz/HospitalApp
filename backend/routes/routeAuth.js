'use strict'
/******
 * Path: '/api/login'
 * ******/
const {Router} = require('express');
const {check} = require('express-validator');
const {Login} = require('../controllers/controllerAuth');
const {validarCampos} = require('../middleware/validarCampos');
const router = Router();
router.post(
    '/',
    [
        check('email','El email es requerido!!!').not().isEmpty(),
        check('password','La Contraseña es requerido!!!').not().isEmpty(),
        validarCampos
    ],
    Login
    )

module.exports = router;