// backend/src/controllers/ticketController.js
const ticketService = require('../services/ticketServices');

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tickets', error: error.message });
  }
};

const getTicketDetails = async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ticket details', error: error.message });
  }
};

const createNewTicket = async (req, res) => {
  try {
    const newTicket = await ticketService.createTicket(req.body);
    res.status(201).json({ success: true, message: 'Ticket created successfully', data: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(400).json({ success: false, message: 'Failed to create ticket', error: error.message });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const updatedTicket = await ticketService.updateTicketStatus(req.params.id, status);
    res.status(200).json({ success: true, message: 'Ticket status updated successfully', data: updatedTicket });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    if (error.message === 'Ticket not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Failed to update ticket status', error: error.message });
  }
};

module.exports = {
  getAllTickets,
  getTicketDetails,
  createNewTicket,
  updateTicketStatus,
};