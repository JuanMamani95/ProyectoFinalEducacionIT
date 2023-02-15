const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost/MIPROYECTO')


.then(db => console.log('MongoDB se Encuentra Conectada'))
.catch(err => console.error(err));

