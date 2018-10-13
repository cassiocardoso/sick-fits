const { GraphQLServer } = require("graphql-yoga");

const db = require("./db");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");

/**
 * Creates a new GraphQL Yoga server
 */
function createServer() {
  return new GraphQLServer({
    context: req => ({ ...req, db }),
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    typeDefs: "src/schema.graphql"
  });
}

module.exports = createServer;
