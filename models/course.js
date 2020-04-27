//colecciones > tablas
//documentos > filas

const mongoose = require('mongoose');


//define filed of documents, to save in the colection
const courseSchema = new mongoose.Schema({
    title: String,
    views: Number,
    user: {
        //to mongoose, this field is id for document find in other colection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

//return model mongoose for comunication to mongodb
module.exports = mongoose.model('Course', courseSchema);