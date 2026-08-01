const ticketService = require('../services/ticketServices');

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const newTicket = await ticketService.createTicket(req.body);
        res.status(201).json({
            success: true,
            message: 'Ticket created successfully',
            data: newTicket
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET all tickets function
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// get ticket by ID function
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        res.status(200).json({
            success: true,
            data: ticket
        });
    } catch (error) {
        // Mongoose CastError for invalid ObjectId will be caught here
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Update and delete ticket functions
exports.updateTicket = async (req, res) => {
    try {
        const updatedTicket = await ticketService.updateTicket(req.params.id, req.body);
        if (!updatedTicket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Ticket updated successfully',
            data: updatedTicket
        });
    } catch (error) {
        // Handle validation errors (e.g., enum mismatch) or CastError
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// deleteTicket function
exports.deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await ticketService.deleteTicket(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Ticket deleted successfully',
            data: deletedTicket
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};