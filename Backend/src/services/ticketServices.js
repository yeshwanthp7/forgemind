const mongoose = require('mongoose');
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
exports.getAllTickets = async (filters = {}) => {
    try {
        const tickets = await Ticket.find(filters)
            .populate('incident', 'description image aiAnalysis') // Populate incident details
            .populate('machine', 'name machineId location department type telemetry healthScore temperature pressure') // Populate machine details
            .sort({ createdAt: -1 })
            .lean(); // Return plain JavaScript objects
        return tickets;
    } catch (error) {
        throw new Error(`Failed to retrieve tickets: ${error.message}`);
    }
};

/**
 * Retrieves a single ticket by its ID (either MongoDB _id or WO-XXXX ticketId).
 * Populates incident and machine details.
 * @param {string} ticketId - The ID of the ticket to retrieve.
 * @returns {Promise<object|null>} The ticket object if found, otherwise null.
 * @throws {Error} If fetching the ticket fails.
 */
exports.getTicketById = async (ticketId) => {
    try {
        let ticket = null;
        if (mongoose.Types.ObjectId.isValid(ticketId)) {
            ticket = await Ticket.findById(ticketId)
                .populate('incident', 'description image aiAnalysis')
                .populate('machine', 'name machineId location department type telemetry healthScore temperature pressure')
                .lean();
        }
        if (!ticket) {
            ticket = await Ticket.findOne({ ticketId: ticketId })
                .populate('incident', 'description image aiAnalysis')
                .populate('machine', 'name machineId location department type telemetry healthScore temperature pressure')
                .lean();
        }
        return ticket;
    } catch (error) {
        throw new Error(`Failed to retrieve ticket: ${error.message}`);
    }
};

/**
 * Updates an existing ticket status by its ID (either MongoDB _id or WO-XXXX ticketId).
 * @param {string} ticketId - The ID of the ticket to update.
 * @param {string} status - New status.
 * @returns {Promise<object|null>} The updated ticket object.
 * @throws {Error} If updating the ticket fails.
 */
exports.updateTicketStatus = async (ticketId, status) => {
    try {
        let query = mongoose.Types.ObjectId.isValid(ticketId) ? { _id: ticketId } : { ticketId: ticketId };
        let ticket = await Ticket.findOne(query);
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        ticket.status = status;
        if (status === 'Resolved' && !ticket.completedAt) {
            ticket.completedAt = new Date();
        } else if (status !== 'Resolved' && status !== 'Closed' && ticket.completedAt) {
            ticket.completedAt = null;
        }

        await ticket.save();

        const populatedTicket = await Ticket.findById(ticket._id)
            .populate('incident', 'description image aiAnalysis')
            .populate('machine', 'name machineId location department type telemetry healthScore temperature pressure')
            .lean();

        return populatedTicket;
    } catch (error) {
        throw new Error(`Failed to update ticket status: ${error.message}`);
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
        let query = mongoose.Types.ObjectId.isValid(ticketId) ? { _id: ticketId } : { ticketId: ticketId };
        const updatedTicket = await Ticket.findOneAndUpdate(query, updateData, { new: true, runValidators: true })
            .populate('incident', 'description image aiAnalysis')
            .populate('machine', 'name machineId location department type telemetry healthScore temperature pressure')
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
        let query = mongoose.Types.ObjectId.isValid(ticketId) ? { _id: ticketId } : { ticketId: ticketId };
        const deletedTicket = await Ticket.findOneAndDelete(query);
        return deletedTicket;
    } catch (error) {
        throw new Error(`Failed to delete ticket: ${error.message}`);
    }
};

/**
 * Generates ticket priority based on AI risk score.
 * @param {number} riskScore - The risk score from AI analysis.
 * @returns {string} The calculated priority ('P1 Critical', 'P2 High', 'P3 Medium', 'P4 Low').
 */
const generatePriority = (riskScore) => {
    if (riskScore >= 90) return 'P1 Critical';
    if (riskScore >= 75) return 'P2 High';
    if (riskScore >= 50) return 'P3 Medium';
    return 'P4 Low';
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
            machine: incident.machine,
            title: `Incident #${incident._id.toString().slice(-6)} - ${priority}`,
            description: incident.description || aiAnalysis.recommendation || 'Automated predictive maintenance ticket',
            priority: priority,
            assignedTo: "Maintenance Team",
            status: "Open",
            estimatedDowntime: aiAnalysis.estimatedDowntime || (aiAnalysis.riskScore >= 80 ? '4.5 Hours' : '1.5 Hours'),
            dueDate: dueDate,
            createdBy: "AI",
            aiAnalysis: {
                severity: aiAnalysis.severity || 'Unknown',
                riskScore: aiAnalysis.riskScore || 0,
                rootCause: aiAnalysis.rootCause || 'N/A',
                recommendation: aiAnalysis.recommendation || 'N/A',
                confidence: aiAnalysis.confidence || 0,
            }
        };

        const newTicket = await Ticket.create(ticketData);
        return newTicket;
    } catch (error) {
        throw new Error(`Failed to create ticket from incident: ${error.message}`);
    }
};