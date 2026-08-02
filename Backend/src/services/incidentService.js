const mongoose = require('mongoose');
const Incident = require('../models/Incident');
const Ticket = require('../models/Ticket');
const ticketService = require('./ticketServices');
const { analyzeImage } = require('./geminiService');

/**
 * Analyzes an incident using Gemini AI and optionally creates a ticket based on risk score.
 * @param {string} incidentId - The ID of the incident to analyze.
 * @returns {Promise<{incident: object, ticket: object|null, aiAnalysis: object}>}
 */
exports.analyzeIncident = async (incidentId) => {
    try {
        if (!incidentId || !mongoose.Types.ObjectId.isValid(incidentId)) {
            throw new Error(`Invalid Incident ID: "${incidentId}"`);
        }

        const incident = await Incident.findById(incidentId).populate('machine');
        if (!incident) {
            throw new Error(`Incident not found with ID: ${incidentId}`);
        }

        const imagePath = incident.image;
        const aiResponse = await analyzeImage(imagePath);

        incident.aiAnalysis = aiResponse;
        await incident.save();

        let createdTicket = null;
        // Automatically create a ticket after AI analysis if risk score is 75 or higher
        if (incident.aiAnalysis && incident.aiAnalysis.riskScore >= 75 && incident.aiAnalysis.recommendation) {
            const existingTicket = await Ticket.findOne({ incident: incident._id });
            if (existingTicket) {
                createdTicket = existingTicket;
            } else {
                console.log(`[IncidentService] Creating work order ticket for incident ${incidentId} (Risk Score: ${incident.aiAnalysis.riskScore})...`);
                createdTicket = await ticketService.createTicketFromIncident(incident, incident.aiAnalysis);
                console.log(`[IncidentService] Ticket created: ${createdTicket?._id}`);
            }
        }

        return {
            incident,
            ticket: createdTicket,
            aiAnalysis: incident.aiAnalysis,
        };
    } catch (error) {
        console.error(`[IncidentService] Error analyzing incident ${incidentId}: ${error.message}`);
        throw error;
    }
};
