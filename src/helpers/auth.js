const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
   if(req.isAuthenticated()) {
    return next();
   }
   req.flash('error_msg', 'No iniciaste sesion');
   res.redirect('/users/ingresar'); 
};

module.exports = helpers;