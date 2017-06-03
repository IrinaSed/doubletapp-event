'use strict';

const mongoose = require('./connection');
const dateformat = require('dateformat');
const Schema = mongoose.Schema;

const Event = new Schema({
    slug: {
        type: String,
        index: true
    },
    name: {
        type: String,
        maxLength: 32,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    logo: {type: String},
    iconNumber: {type: Number},
    description: {
        type: String,
        maxLength: 128,
        required: true
    },
    what: {
        type: String,
        maxLength: 32,
        required: true
    },
    when: {
        type: Date,
        maxLength: 32,
        required: true
    },
    location: {
        lon: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        },
        lat: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        }
    }
});

const p = '../images';
const icons = [
    `${p}/read_icon.png`, `${p}/skiing_icon.png`, `${p}/teaching_icon.png`, `${p}/turist_icon.png`,
    `${p}/read_icon.png`, `${p}/skiing_icon.png`, `${p}/teaching_icon.png`, `${p}/turist_icon.png`,
    `${p}/read_icon.png`, `${p}/skiing_icon.png`, `${p}/teaching_icon.png`, `${p}/turist_icon.png`,
];

Event.virtual('iconSrc').get(function () {
    return icons[this.iconNumber - 1];
});

Event.virtual('formattedDate').get(function () {
    return dateformat(this.when, 'dddd, mmmm dS, yyyy');
});


module.exports = mongoose.model('Event', Event);
