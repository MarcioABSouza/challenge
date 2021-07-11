module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.userSchema.create,
            },
            handler: ctx.userController.create
        },
        {
            method: 'patch',
            path: '/id/:id',
            validation: {
                body: ctx.userSchema.update,
                params:ctx.userSchema.byId
            },
            handler: ctx.userController.update
        },
        {
            method: 'get',
            path: '/id/:id',
            validation: {
                params: ctx.userSchema.byId,
            },
            handler: ctx.userController.get
        },
        {
            method: 'get',
            path: '/name/:name',
            validation: {
                params: ctx.userSchema.byName,
            },
            handler: ctx.userController.get
        },
        {
            method: 'get',
            path: '/',
            validation: {},
            handler: ctx.userController.getAll
        },
        {
            method: 'delete',
            path: '/id/:id',
            validation: {
                params: ctx.userSchema.byId,
            },
            handler: ctx.userController.delete
        }
    ];
};