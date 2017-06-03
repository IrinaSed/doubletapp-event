'use strict';

const hbs = require('hbs');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const layouts = require('handlebars-layouts');

const index = require('./routes/index');
const event = require('./routes/event');
const advertise = require('./routes/advertize');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerHelper(layouts(hbs.handlebars));
hbs.registerPartials(path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/blocks'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'views/images')));

app.use('/', index);
app.use('/', event);
app.use('/', advertise);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
