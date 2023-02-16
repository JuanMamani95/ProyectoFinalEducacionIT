const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');
require('dotenv').config();

router.get('/users/ingresar', (req, res) => {
    res.render('users/ingresar.hbs');
});

router.post('/users/ingresar', passport.authenticate('local', {
   successRedirect: '/pedidos',
   failureRedirect: '/users/ingresar',
   failureFlash: true 
}));

router.get('/users/registrarse', (req, res) => {
    res.render('users/registrarse.hbs');
});
router.post('/users/registrarse', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({text: 'Porfavor escriba su nombre'});
    }
    if (email.length <= 0) {
        errors.push({text: 'Porfavor escriba su email'});
    }
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas son distintas'});
    }
    if (password.length <= 0) {
        errors.push({text: 'Porfavor escriba una contraseña'});
    }
    if (password.length < 6) {
        errors.push({text: 'La contraseña debe ser mayor e igual a 6 caracteres'});
    }
    if (errors.length > 0) {
        res.render('users/registrarse.hbs', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'Ya existe un usuario registrado con el mismo email ingresado');
            res.redirect('/users/registrarse');
        } else {
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'El registro se realizo correctamente');
        res.redirect('/users/ingresar');
        } 
    }
    
});

router.get('/users/salir', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err);}
    req.flash('success_msg', 'Se ha cerrado sesion');
        res.redirect('/users/ingresar');
    });
});

module.exports = router;