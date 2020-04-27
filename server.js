const express = require('express');
const mongoose = require('mongoose'); //ODM
const bodyParser = require('body-parser');

//const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { ApolloServer } = require('apollo-server-express');
//const { makeExecutableSchema } = require('graphql-tools');

//use merge for combine multiples objs
const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const courseResolvers = require('./resolvers/course.resolvers');

const userTypeDefs = require('./types/user.types');
const userResolvers = require('./resolvers/user.resolvers');

const authFunc = require('./libs/auth');


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

const resolver = {};


//instance obj, for create server graphql
const server = new ApolloServer({
    typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
    resolvers: merge(resolver, courseResolvers, userResolvers),
    //context of graphql, allow to share info between all operations graphql
    //trough obj - the value
    //req, querie info, parameter queries, headers req
    context: authFunc
});

server.applyMiddleware({ app: app });

//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));
//app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(8080, function() {
    console.log("Server on");
})