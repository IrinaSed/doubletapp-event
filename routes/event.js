'use strict';

const shortid = require('shortid');
const Event = require('../models/event');
const router = require('express').Router();
const upload = require('multer')({ dest: 'views/images' });

router.get('/event/:event', async (req, res, next) => {
    const event = await Event.findOne({slug: req.params.event});
    if (!event) {
        res.send(404);
    } else {
        res.render('event/index', {
            title: `Событие: ${event.name}`,
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

router.get('/create/event', (req, res, next) => {
    res.render('create/event/index', {
        title: 'Создать событие'
    });
});

router.post('/create/event', upload.single('logo'), async function(req, res, next) {
    const coords = req.body.coords;
    const [lat, lon] = coords.substr(1, coords.length - 2).split(', ');
    const event = new Event({
        slug: shortid.generate(),
        name: req.body.name,
        organizer: req.body.organizer,
        logo: req.file.filename,
        iconNumber: Number(req.body['selected-icon']),
        description: req.body.description,
        when: req.body.when,
        what: req.body.what,
        location: {
            lon: lon,
            lat: lat
        }
    });

    await event.save();
    res.redirect('/');
});

module.exports = router;
