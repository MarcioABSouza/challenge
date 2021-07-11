const joi = require('joi').extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({

        city: joi.string().regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3).max(30).required(),
        state:joi.string().regex(/^[A-Z]*$/).min(2).max(2).required(),
        cep: joi.string().regex(/^[0-9]*$/).min(8).max(8).required(),
    }), 

    byCityName: joi.object().keys({
        city: joi.string().regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3).max(30).required(),
    }), 

    byCityState: joi.object().keys({
        state:joi.string().regex(/^[A-Z]*$/).min(2).max(2).required(),
    }), 

    byCep: joi.object().keys({
        cep: joi.string().regex(/^[0-9]*$/).min(8).max(8).required(),
    })
});
