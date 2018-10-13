/**
 * This file connects to the Prisma db and enable us to query it using JS
 */
const { Prisma } = require("prisma-binding");

const db = new Prisma({
  debug: true,
  endpoint: process.env.PRISMA_ENDPOINT,
  typeDefs: "src/generated/prisma.graphql",
  secret: process.env.PRISMA_SECRET
});

module.exports = db;
