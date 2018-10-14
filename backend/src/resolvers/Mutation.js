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
  }
};

module.exports = Mutations;
