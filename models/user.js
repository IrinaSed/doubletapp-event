'use strict';

const mongoose = require('./connection');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        maxLength: 32,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    age: {
        type: Number,
        min: 0,
        required: true
    },
    location: {
        longitude: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        },
        latitude: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        }
    }
});

module.exports = mongoose.model('User', User);
