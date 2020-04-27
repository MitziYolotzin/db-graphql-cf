const express = require('express');
const mongoose = require('mongoose'); //ODM

mongoose.connect('mongodb://localhost/graphql_db_course', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();

app.listen(8080, function() {
    console.log("Server on");
})