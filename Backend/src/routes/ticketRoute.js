const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

// Route for creating a new ticket and getting all tickets
router.route('/')
    .post(ticketController.createNewTicket)
    .get(ticketController.getAllTickets);

// Routes for specific ticket operations by ID
router.route('/:id')
    .get(ticketController.getTicketDetails)
    .patch(ticketController.updateTicketStatus);

module.exports = router;
