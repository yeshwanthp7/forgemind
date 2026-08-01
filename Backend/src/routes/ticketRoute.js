const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

// Route for creating a new ticket and getting all tickets
router.route('/')
    .post(ticketController.createTicket)
    .get(ticketController.getAllTickets);

// Routes for specific ticket operations by ID
router.route('/:id')
    .get(ticketController.getTicketById)
    .put(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);

module.exports = router;
