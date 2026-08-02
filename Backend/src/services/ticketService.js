// backend/src/services/ticketService.js
const ticketServices = require('./ticketServices');

module.exports = {
  ...ticketServices,
  getTickets: ticketServices.getAllTickets,
  getTicketById: ticketServices.getTicketById,
  createTicket: ticketServices.createTicket,
  updateTicketStatus: ticketServices.updateTicketStatus,
};