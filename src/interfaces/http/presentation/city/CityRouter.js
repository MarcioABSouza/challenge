module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.citySchema.create,
            },
            handler: ctx.cityController.create
        },
        {
            method: 'get',
            path: '/name/:city',
            validation: {
                params: ctx.citySchema.byCityName,
            },
            handler: ctx.cityController.get
        },
        {
            method: 'get',
            path: '/state/:state',
            validation: {
                params: ctx.citySchema.byCityState,
            },
            handler: ctx.cityController.get
        },
        {
            method: 'get',
            path: '/',
            validation: {},
            handler: ctx.cityController.getAll
        },
        {
            method: 'delete',
            path: '/id/:id',
            validation: {
                params: ctx.citySchema.byId,
            },
            handler: ctx.cityController.delete
        }
    ];
};