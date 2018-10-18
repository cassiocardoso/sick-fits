const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if user is logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },
  updateItem(parent, args, ctx, info) {
    // create a copy of the updated properties
    const updates = { ...args };

    // delete `id` prop since it can't be modified
    delete updates.id;

    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };

    // 1. find the item
    // 2nd argument is a raw GraphQL with what we want to return from the query
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // 2. TODO: check if the user owns the item or has the necessary permissions
    // 3. delete the item
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    // normalize the e-mail input
    args.email = args.email.toLowerCase();

    // hash the user password
    const password = await bcript.hash(args.password, 10);

    // create the user in the database
    const user = ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );

    // create the necessary JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // set the JWT as a cookie in the response so it gets passed in the following requests
    ctx.response.cookie("token", {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year (in ms)
    });

    // return the created user to the browser
    return user;
  }
};

module.exports = Mutations;
