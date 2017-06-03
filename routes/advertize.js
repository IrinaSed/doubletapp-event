'use strict';

const router = require('express').Router();
const Event = require('../models/event');
const Advertise = require('../models/advertising');
const shortid = require("shortid");

router.get('/advertise/:advertise', async (req, res, next) => {
    const advertise = await Advertise.findOne({slug: req.params.advertise});
    if (!advertise) {
        res.send(404);
    } else {
        const event = await Event.findById(advertise.event);

        res.render('event/index', {
            title: `Рекламная компания: ${advertise.name}`,
            organizer: event.organizer,
            logoSrc: `../images/${event.logo}`,
            iconSrc: event.iconSrc,
            location: event.location,
            name: event.name,
            what: event.what,
            when: event.formattedDate,
            description: event.description
        });
    }
});

router.get('/create/advertise', async (req, res, next) => {
    const events = await Event.find({});

    res.render('create/advertise/index', {
        title: 'Создать рекламную компанию', events
    });
});

router.post('/create/advertise', async function(req, res, next) {
    const advertise = new Advertise({
        slug: shortid.generate(),
        name: req.body.name,
        event: req.body.event
    });

    await advertise.save();
    res.redirect('/');
});

module.exports = router;
