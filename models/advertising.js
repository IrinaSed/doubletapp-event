'use strict';

const mongoose = require('./connection');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

const Advertising = new Schema({
    slug: {
        type: String,
        index: true
    },
    name: {
        type: String,
        maxLength: 32,
        required: true
    },
    event: {
        type: ObjectID,
        ref: 'Event',
        required: true
    },
    audience: [{type: ObjectID, ref: 'User'}]
});

module.exports = mongoose.model('Advertising', Advertising);
