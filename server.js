const express = require('express');
const mongoose = require('mongoose'); //ODM
const bodyParser = require('body-parser');

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const courseTypeDefs = require('./types/course.types');

mongoose.connect('mongodb://localhost/graphql_db_course', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();

const typeDefs = `
    type Alert {
        message: String
    }

    type Query {
        _ : Boolean
    }

    type Mutation {
        _ : Boolean
    }
`;

const schema = makeExecutableSchema({
    //make array, for make one definition of types
    typeDefs: [typeDefs, courseTypeDefs],
    resolvers: {}
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(8080, function() {
    console.log("Server on");
})