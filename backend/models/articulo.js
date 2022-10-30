const mongoose = require('mongoose');

const articuloModelo = mongoose.Schema({
  nombre: {type: String, required: true},
  precio: {type: Number, required: true},
  descripcion: {type: String, required: true},
  //imagen: {type: String, required: true},
  cantidad: {type: Number, required: true},
  categoria: {type: String, required: true},
  //fecha: {type: Date, required: true},
  //usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true}
});


module.exports = mongoose.model('Articulo', articuloModelo);
