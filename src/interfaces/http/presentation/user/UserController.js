const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    create: AsyncMiddleware(async ctx => {

        const userData = await opts.createUserOperation.execute(ctx.body);
        const userSerialized = opts.userSerializer.create(userData);

        return ctx.res.status(opts.httpConstants.HttpCode.CREATED).json(userSerialized);
    }),

    get: AsyncMiddleware(async ctx => {
        const query = ctx.params;

        const userData = await opts.getUserOperation.get(query);
        const userSerialized = opts.userSerializer.get(userData);

        return ctx.res.status(opts.httpConstants.HttpCode.OK).json(userSerialized);
    }),

    getAll: AsyncMiddleware(async ctx => {

        const userData = await opts.getUserOperation.getAll();
        const userSerialized = opts.userSerializer.getAll(userData);

        return ctx.res.status(opts.httpConstants.HttpCode.OK).json(userSerialized);
    }),


    update: AsyncMiddleware(async ctx => {
        const { name, last_name } = ctx.body;
        const { id } = ctx.params;

        const userData = await opts.updateUserOperation.execute({ id, name, last_name });
        const userSerialized = opts.userSerializer.update(userData);

        return ctx.res.status(opts.httpConstants.HttpCode.OK).json(userSerialized);
    }),

    delete: AsyncMiddleware(async ctx => {
        const query = ctx.params;

        await opts.deleteUserOperation.execute(query);

        return ctx.res.status(opts.httpConstants.HttpCode.OK).send();
    })
});