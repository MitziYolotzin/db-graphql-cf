//colecciones > tablas
//documentos > filas

const mongoose = require('mongoose');


//define filed of documents, to save in the colection
const courseSchema = new mongoose.Schema({
    title: String,
    views: Number
});

//return model mongoose for comunication to mongodb
module.exports = mongoose.model('Course', courseSchema);