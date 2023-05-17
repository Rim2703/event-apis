const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true,
    },
    schedule: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    files: {
        image: {
            type: String,
            required: true,
        },
    },
    moderator: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
        required: true,
    },
    rigor_rank: {
        type: Number,
        required: true,
    },
    attendees: [{
        type: [String],
        required: true,
        default: [],
    }],
})

module.exports = mongoose.model('Event', eventSchema)


