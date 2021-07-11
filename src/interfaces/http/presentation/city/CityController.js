const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    create: AsyncMiddleware(async ctx => {

        const cityData = await opts.createCityOperation.execute(ctx.body);
        const citySerialized = opts.citySerializer.create(cityData);

        return ctx.res.status(opts.httpConstants.HttpCode.CREATED).json(citySerialized);
    }),

    get: AsyncMiddleware(async ctx => {
        const query = ctx.params;

        const cityData = await opts.getCityOperation.get(query);
        const citySerialized = opts.citySerializer.get(cityData);

        return ctx.res.status(opts.httpConstants.HttpCode.OK).json(citySerialized);
    }),

    getAll: AsyncMiddleware(async ctx => {

        const cityData = await opts.getCityOperation.getAll();
        const citySerialized = opts.citySerializer.getAll(cityData);

        return ctx.res.status(opts.httpConstants.HttpCode.OK).json(citySerialized);
    }),

    delete: AsyncMiddleware(async ctx => {
        const query = ctx.params;

        await opts.deleteCityOperation.execute(query);

        return ctx.res.status(opts.httpConstants.HttpCode.OK).send();
    })
});