'use strict';
const { Schema } = require('mongoose');
const autoincrement = require('simple-mongoose-autoincrement');

module.exports = ({ providerConnection, config }) => {
    const connection = providerConnection.connection;

    const citySchema = new Schema({
        id: {
            type: Number,
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }, 
        cep: {
            type: String,
            required: true,
            unique:true
        }
    }, { versionKey: false, timestamps: true });

    citySchema.plugin(autoincrement, { field: 'id' });

    return connection.model(config.db.collections.cities.name, citySchema);
};