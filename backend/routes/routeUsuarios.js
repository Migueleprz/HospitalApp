'use strict'



const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validarCampos');
const {validateJWT} = require("../middleware/validateJWT");
const {Create, Read, Update, Delete, ReadByUid, ReadByEmail} = require('../controllers/controllerUsuario');
const router = Router();

router.get('/', validateJWT, Read);
router.post(
    '/',
    [
        validateJWT,
        check('nombre','El nombre es requerido!!!').not().isEmpty(),
        check('password','La Contraseña es requerido!!!').not().isEmpty(),
        check('status','El Estado es requerido!!!').not().isEmpty(),
        check('email','El Correo es requerido o no es valido!!!').isEmail(),
        validarCampos

    ],
    Create
);

router.put(
    '/:id',
    [
        validateJWT,
        check('nombre','El nombre es requerido!!!').not().isEmpty(),
        check('status','El Estado es requerido!!!').not().isEmpty(),
        check('role','El Rol es requerido!!!').not().isEmpty(),
        check('email','El Correo es requerido o no es valido!!!').isEmail(),
        validarCampos

    ],
    Update
);

router.delete('/:id',validateJWT,Delete);

module.exports = router;