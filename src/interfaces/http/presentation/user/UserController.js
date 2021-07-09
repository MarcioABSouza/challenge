const AsyncMiddleware = require('src/interfaces/http/presentation/middlewares/AsyncMiddleware');

module.exports = opts => ({
    createUser: AsyncMiddleware(async ctx => {

        //yeah, im still using a mock for this controller!
        //const userData = await opts.createUserOperation.execute(ctx.body);
        
        return ctx.res.status(opts.httpConstants.HttpCode.CREATED).json(ctx.body);
    })
});