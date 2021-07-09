module.exports = ({ container }) => {
    const ctx = container.cradle;

    return [
        {
            method: 'post',
            path: '/',
            validation: {
                body: ctx.userSchema.create,
            },
            handler: ctx.userController.createUser
        }
    ];
};