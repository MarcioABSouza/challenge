'use strict';
const { Schema } = require('mongoose');
const autoincrement = require('simple-mongoose-autoincrement');

module.exports = ({ providerConnection, config }) => {
    const connection = providerConnection.connection;

    const userSchema = new Schema({
        id: {
            type: Number,
        },
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        birth_date: {
            type: String,
            required: true
        }
    }, { versionKey: false, timestamps: true });

    userSchema.plugin(autoincrement, { field: 'id' });

    return connection.model(config.db.collections.user.name, userSchema);
};