const { forwardTo } = require("prisma-binding");

// forwardTo allows to query Prisma directly, it's useful for simple operations
// where no logic or authentication is needed
const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db")
};

module.exports = Query;
