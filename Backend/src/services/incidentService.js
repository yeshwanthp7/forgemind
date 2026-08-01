const Incident = require('../models/Incident');
const ticketService = require('./ticketServices'); // Import the ticket service

const {analyzeImage} = require('./geminiService');

/**
 * Analyzes an incident using Gemini AI and optionally creates a ticket based on risk score.
 * @param {string} incidentId - The ID of the incident to analyze.
 * @returns {Promise<{incident: object, ticket: object|null}>} An object containing the updated incident and the created ticket (if any).
 * @throws {Error} If the incident is not found or analysis fails.
 */
exports.analyzeIncident = async(incidentId) => {
    try {
        const incident = await Incident.findById(incidentId);
        if(!incident){
            throw new Error('Incident not found');
        }

        const imagePath = incident.image;
        const aiResponse = await analyzeImage(imagePath);

        incident.aiAnalysis = aiResponse;

        await incident.save();

        let createdTicket = null;
        // Automatically create a ticket after AI analysis if risk score is 80 or higher
        if (incident.aiAnalysis && incident.aiAnalysis.riskScore >= 80 && incident.aiAnalysis.recommendation) {
            console.log(`AI analysis complete for incident ${incidentId} with risk score ${incident.aiAnalysis.riskScore}. Creating a new ticket...`);
            createdTicket = await ticketService.createTicketFromIncident(incident, incident.aiAnalysis);
            console.log(`Ticket created automatically: ${createdTicket._id}`);
        } else if (incident.aiAnalysis && incident.aiAnalysis.riskScore !== undefined) {
            console.log(`AI analysis complete for incident ${incidentId} with risk score ${incident.aiAnalysis.riskScore}. No ticket created as risk score is below 80.`);
        } else {
            console.log(`AI analysis complete for incident ${incidentId}, but missing riskScore or recommendation to create a ticket.`);
        }

        return { incident, ticket: createdTicket };
    } catch (error) {
        console.error(`Error analyzing incident ${incidentId}: ${error.message}`);
        throw error; // Re-throw the error for the controller to handle
    }
}
