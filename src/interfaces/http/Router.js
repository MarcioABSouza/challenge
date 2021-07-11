const { Router } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');

module.exports = ({
    container,
    loggerMiddleware,
    httpErrorMiddleware,
    exception
}) => {
    const apiRouter = Router();
    apiRouter
        .use(loggerMiddleware)
        .use(methodOverride('X-HTTP-Method-Override'))
        .use(cors())
        .use(bodyParser.json())
        .use(compression())
        .use('/api/user', container.cradle.routerRegister.register(container.cradle.userRouter))
        .use('/api/city', container.cradle.routerRegister.register(container.cradle.cityRouter))
        .use((req, res, next) => { next(exception.notFound()); })
        .use(httpErrorMiddleware);

    return apiRouter;
};
