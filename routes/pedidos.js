const express = require('express');
const router = express.Router();

const Pedido = require('../models/Pedido');
const { isAuthenticated } = require('../helpers/auth');
require('dotenv').config();

router.get('/pedidos/nuevopedido', isAuthenticated, (req, res) => {
   res.render('pedidos/nuevopedido.hbs');
});

router.post('/pedidos/nuevopedido', isAuthenticated, async (req, res) => {
   const { title, direction, description  } = req.body;
   const errors = [];
   if(!title) {
      errors.push({text: 'Porfavor escriba un Titulo'});  
   }
   if(!direction) {
      errors.push({text: 'Porfavor escriba una Direccion'});
   }
   if(!description) {
      errors.push({text: 'Porfavor escriba una Descripcion'});
   }
   if(errors.length > 0) {
      res.render('pedidos/nuevopedido.hbs', {
         errors,
         title,
         direction,
         description
         
      });
   } else {
     const newPedido = new Pedido({ title, direction, description });
     newPedido.user = req.user.id;
     await newPedido.save();
     req.flash('success_msg', 'Pedido realizado correctamente');
     res.redirect('/pedidos');
   }
});

router.get('/pedidos', isAuthenticated, async (req, res) => {
  
   const pedidos = await Pedido.find({user: req.user.id}).lean().sort({date: 'desc'});
   res.render('pedidos/allpedidos.hbs', {pedidos});

});

router.get('/pedidos/editar/:id', isAuthenticated, async (req, res) => {
   const pedido = await Pedido.findById(req.params.id).lean();  
   res.render('pedidos/editarpedido.hbs', {pedido});
});

router.put('/pedidos/editarpedido/:id', isAuthenticated, async (req, res) => {
   const { title, direction, description  } = req.body;
   await Pedido.findByIdAndUpdate(req.params.id, { title, direction, description });
   req.flash('success_msg', 'Se modifico correctamente el Pedido');
   res.redirect('/pedidos');
});

router.delete('/pedidos/eliminar/:id', isAuthenticated, async (req, res) => {
   await Pedido.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Se elimino correctamente el Pedido');
   res.redirect('/pedidos');
});

module.exports = router;
