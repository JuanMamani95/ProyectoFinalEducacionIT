const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const { Schema } = mongoose;

const PedidoSchema = new Schema({
    title: {type: String, required: true},
    direction: {type: String, required: true},
    description: { type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String} 
});

module.exports = mongoose.model('Pedido', PedidoSchema);
