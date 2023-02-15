
const mongoose = require('mongoose'); 

const URL = process.env.MONGOATLAS;

exports.getConnection = async () => {
    try {
        mongoose.connect(URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        return `DB Conectada correctamente`
    } catch (error) {
        return `No conectado - ${error}`
    }
};
