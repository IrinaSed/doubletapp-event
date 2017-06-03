'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/events';

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo error'));
db.once('open', () => {});

module.exports = mongoose;