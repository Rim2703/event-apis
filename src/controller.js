const eventModel = require('./model')

// Create event
const createEvent = async (req, res) => {
    try {
        const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, files: { image } } = req.body

        const attendeeIds = req.body.attendees || [];
        
        const event = new eventModel({
            uid: Date.now(), // Generate a unique ID using the timestamp
            name,
            tagline,
            schedule,
            description,
            moderator,
            category,
            sub_category,
            rigor_rank,
            files: { image },
            attendees: attendeeIds,
        })

        let createEvents = await eventModel.create(event)
        return res.status(201).send(createEvents)
    }
    catch (err) {
        return res.status(500).send({ Error: err.message })
    }
}


// GET /api/v3/app/events?id=:event_id
const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventModel.findOne({ uid: eventId })
        if (event) {
            res.status(200).json(event)
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    }
    catch (err) {
        return res.status(500).send({ Error: err.message })
    }
}


// GET /api/v3/app/events?type=latest&limit=5&page=1
const getEventByQuery = async (req, res) => {
    try {
        const { type, limit, page } = req.query;

        const query = eventModel.find()

        if (type === 'latest') {
            query.sort({ schedule: -1 }) // Sort events in descending order of schedule
        }

        if (limit) {
            query.limit(Number(limit))
        }

        if (page) {
            const skip = (Number(page) - 1) * Number(limit)
            query.skip(skip) // Skip events based on pagination
        }

        const events = await query.exec()
        res.status(200).send(events)

    } catch (err) {
        return res.status(500).send({ Error: err.message })
    }
}


// PUT /api/v3/app/events/:id
const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const updatedEvent = await eventModel.findOneAndUpdate(
            { uid: eventId },
            req.body,
            { new: true }
        )

        if (updatedEvent) {
            res.status(200).send(updatedEvent)
        } else {
            res.status(404).json({ error: 'Event not found' })
        }
    } catch (err) {
        return res.status(500).send({ Error: err.message })
    }
}


// DELETE /api/v3/app/events/:id
const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await eventModel.findOneAndDelete({ uid: eventId })

        if (deletedEvent) {
            res.status(200).send({ status: false, message: "Event is successfully deleted!" })
        } else {
            res.status(404).json({ error: 'Event not found' })
        }
    }
    catch (err) {
        return res.status(500).send({ Error: err.message })
    }
}

module.exports = { createEvent, getEventById, getEventByQuery, updateEvent, deleteEvent }