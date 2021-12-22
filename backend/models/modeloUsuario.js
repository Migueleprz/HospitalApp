'use strict'

const {Schema, model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: 'default.png'
    },
    role:{
        type: String,
        required: true,
        default: 'ROLE_USER'
    },
    status:{
        type: Boolean,
        required: true,
    },
    authGoogle:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function(){
   const {__v, _id, password,...object} = this.toObject();
   object.uid = _id;
   return object;
})
module.exports = model('Usuario', UsuarioSchema);