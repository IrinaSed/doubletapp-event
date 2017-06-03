'use strict';

const router = require('express').Router();
const Event = require('../models/event');
const Advertising = require('../models/advertising');


function connectEvent(events, advertise) {
    advertise.event = events.find(event => advertise.event.id.equals(event._id.id));
    return advertise;
}

router.get('/', async (req, res, next) => {
    const events = await Event.find({});
    res.render('index', {
        title: 'Events',
        advertising: (await Advertising.find({}))
            .map(connectEvent.bind(null, events)),
        events
    });
});

module.exports = router;
