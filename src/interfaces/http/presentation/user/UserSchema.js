const joi = require('joi').extend(require('@hapi/joi-date'));

module.exports = () => ({
    create: joi.object().keys({

        name: joi.string().min(5).max(15).required(),
        gender:joi.string().valid('M', 'F').allow('').required(),
        age: joi.number().positive().required(),
        birth_date: joi.string().isoDate(),
        city: joi.string().min(3).max(30).required(),
    })
});
