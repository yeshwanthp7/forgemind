const Incident = require('../models/Incident');

const {analyzeImage} = require('./geminiService');

exports.analyzeIncident = async(incidentId) =>{
    const incident = await Incident.findById(incidentId);
    if(!incident){
        throw new Error('Incident not found');
    }

    const imagePath = incident.image;
    const aiResponse = await analyzeImage(imagePath);

    incident.aiAnalysis = aiResponse;

    await incident.save();

    return incident;
}