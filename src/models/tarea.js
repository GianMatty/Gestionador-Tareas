const mongoose = require('mongoose');
const { Schema } = mongoose;

const TareaSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
})

module.exports = mongoose.model('Tarea', TareaSchema)//creamos un modelo y su structura