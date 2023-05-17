const express = require('express')
const router = express.Router()
const { createEvent, getEventById, getEventByQuery, updateEvent, deleteEvent } = require('./controller')

router.post('/events', createEvent)
router.get('/events/:id', getEventById)
router.get('/events', getEventByQuery)
router.put('/events/:id', updateEvent)
router.delete('/events/:id', deleteEvent)

module.exports = router