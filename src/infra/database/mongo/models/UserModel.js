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
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        city: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        birth_date: {
            type: Date,
            required: true
        }
    }, { versionKey: false, timestamps: true });

    userSchema.plugin(autoincrement, { field: 'id' });

    return connection.model(config.db.collections.users.name, userSchema);
};