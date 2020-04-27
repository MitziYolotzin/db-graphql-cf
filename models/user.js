const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    hashedPassword: {
        type: String,
        //required: true
    },
    token: String,
    //save references
    courses: [{
        // array with id, to documents in colection course
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('User', userSchema);