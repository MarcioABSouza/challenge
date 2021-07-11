const joi = require('joi').extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({

        name: joi.string().regex(/^[a-zA-Z]*$/).min(2).max(15).required(),
        last_name:joi.string().regex(/^[a-zA-Z]*$/).min(5).max(15).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        gender:joi.string().valid('M', 'F', 'NonBinary').required(),
        age: joi.number().positive().required(),
        birth_date: joi.string().required(),
        city: joi.string().regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3).max(30).required(),
    }), 

    byId: joi.object().keys({
        id: joi.string().regex(/^[0-9]*$/).min(1).max(30).required(),
    }), 

    byName: joi.object().keys({
        name: joi.string().regex(/^[a-zA-Z]*$/).min(2).max(15).required()
    }), 

    update: joi.object().keys({
        name: joi.string().regex(/^[a-zA-Z]*$/).min(2).max(15).required(),
        last_name:joi.string().regex(/^[a-zA-Z]*$/).min(5).max(15).required(),
    }), 

    delete: joi.object().keys({
        id: joi.string().regex(/^[0-9]*$/).min(1).max(30).required(),
    }), 
});
