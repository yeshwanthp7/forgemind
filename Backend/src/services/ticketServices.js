const Ticket = require('../models/Ticket');
const Incident = require('../models/Incident'); // Needed for population
const Machine = require('../models/Machine');   // Needed for population

/**
 * Creates a new ticket in the database.
 * @param {object} ticketData - The data for the new ticket.
 * @returns {Promise<object>} The newly created ticket.
 * @throws {Error} If ticket creation fails.
 */
exports.createTicket = async (ticketData) => {
    try {
        const newTicket = await Ticket.create(ticketData);
        return newTicket;
    } catch (error) {
        throw new Error(`Failed to create ticket: ${error.message}`);
    }
};

/**
 * Retrieves all tickets from the database.
 * Populates incident and machine details.
 * @returns {Promise<Array<object>>} An array of ticket objects.
 * @throws {Error} If fetching tickets fails.
 */
exports.getAllTickets = async () => {
    try {
        const tickets = await Ticket.find()
            .populate('incident', 'description image aiAnalysis') // Populate incident details
            .populate('machine', 'name location department') // Populate machine details
            .lean(); // Return plain JavaScript objects
        return tickets;
    } catch (error) {
        throw new Error(`Failed to retrieve tickets: ${error.message}`);
    }
};

/**
 * Retrieves a single ticket by its ID.
 * Populates incident and machine details.
 * @param {string} ticketId - The ID of the ticket to retrieve.
 * @returns {Promise<object|null>} The ticket object if found, otherwise null.
 * @throws {Error} If fetching the ticket fails.
 */
exports.getTicketById = async (ticketId) => {
    try {
        const ticket = await Ticket.findById(ticketId)
            .populate('incident', 'description image aiAnalysis')
            .populate('machine', 'name location department')
            .lean();
        return ticket;
    } catch (error) {
        throw new Error(`Failed to retrieve ticket: ${error.message}`);
    }
};

/**
 * Updates an existing ticket by its ID.
 * @param {string} ticketId - The ID of the ticket to update.
 * @param {object} updateData - The data to update the ticket with.
 * @returns {Promise<object|null>} The updated ticket object if found, otherwise null.
 * @throws {Error} If updating the ticket fails.
 */
exports.updateTicket = async (ticketId, updateData) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, updateData, { new: true, runValidators: true })
            .populate('incident', 'description image aiAnalysis')
            .populate('machine', 'name location department')
            .lean();
        return updatedTicket;
    } catch (error) {
        throw new Error(`Failed to update ticket: ${error.message}`);
    }
};

/**
 * Deletes a ticket by its ID.
 * @param {string} ticketId - The ID of the ticket to delete.
 * @returns {Promise<object|null>} The deleted ticket object if found, otherwise null.
 * @throws {Error} If deleting the ticket fails.
 */
exports.deleteTicket = async (ticketId) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
        return deletedTicket;
    } catch (error) {
        throw new Error(`Failed to delete ticket: ${error.message}`);
    }
};

/**
 * Generates ticket priority based on AI risk score.
 * @param {number} riskScore - The risk score from AI analysis.
 * @returns {string} The calculated priority ('Low', 'Medium', 'High', 'Critical').
 */
const generatePriority = (riskScore) => {
    if (riskScore >= 90) return 'Critical';
    if (riskScore >= 75) return 'High';
    if (riskScore >= 50) return 'Medium';
    return 'Low';
};

/**
 * Creates a new ticket automatically based on an incident and its AI analysis.
 * @param {object} incident - The incident object.
 * @param {object} aiAnalysis - The AI analysis result for the incident.
 * @returns {Promise<object>} The automatically created ticket.
 * @throws {Error} If automatic ticket creation fails.
 */
exports.createTicketFromIncident = async (incident, aiAnalysis) => {
    try {
        if (!incident || !aiAnalysis || typeof aiAnalysis.riskScore === 'undefined' || !aiAnalysis.recommendation) {
            throw new Error('Invalid incident or AI analysis data provided for automatic ticket creation.');
        }

        const priority = generatePriority(aiAnalysis.riskScore);

        // Set due date to tomorrow
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 1);

        const ticketData = {
            incident: incident._id,
            machine: incident.machine, // Assuming incident object has a machine field
            title: `Incident #${incident._id.toString().slice(-6)} - ${priority} Priority`, // Example title
            description: aiAnalysis.recommendation,
            priority: priority,
            assignedTo: "Maintenance Team", // As per requirement
            status: "Open",
            estimatedDowntime: aiAnalysis.estimatedDowntime || 'N/A', // Assuming AI might provide this, or default
            dueDate: dueDate,
            createdBy: "AI" // As per requirement
        };

        const newTicket = await Ticket.create(ticketData);
        return newTicket;
    } catch (error) {
        throw new Error(`Failed to create ticket from incident: ${error.message}`);
    }
};