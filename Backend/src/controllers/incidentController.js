const mongoose = require("mongoose");
const Incident = require("../models/Incident");
const { analyzeIncident } = require("../services/incidentService");

exports.createIncident = async(req,res) =>{
    try{
        if(!req.file){
            return res.status(400).json({
                success : false,
                message : "Please upload an image"
            })
        }
        const { machine, description } = req.body;

        const incident = await Incident.create({
            machine,
            description,
            image: req.file.path
        });

        res.status(201).json({
            success: true,
            message: "Incident created successfully",
            incident
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

exports.getIncidents = async(req,res) =>{
    try{
        const incidents = await Incident.find()
            .populate("machine", "name machineId location department");
        res.status(200).json({
            success:true,
            count:incidents.length,
            incidents,
        
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });

    }
}

// Get a single incident by ID
exports.getIncidentById = async(req,res) =>{
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid Incident ID: "${id}"`,
            });
        }
        const incident = await Incident.findById(id)
            .populate("machine", "name machineId location department");
        if(!incident){
            return res.status(404).json({
                success:false,
                message:"Incident not found",
            });
        }
        res.status(200).json({
            success:true,
            incident,
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}

// Update an incident

exports.updateIncident = async(req,res)=>{
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid Incident ID: "${id}"`,
            });
        }
        const incident = await Incident.findByIdAndUpdate(id, req.body, {new:true});
        if(!incident){
            return res.status(404).json({
                success:false,
                message:"Incident not found",
            });
        }
        res.status(200).json({
            success:true,
            incident,
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}

// Delete an incident
exports.deleteIncident = async(req,res)=>{
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid Incident ID: "${id}"`,
            });
        }
        const incident = await Incident.findByIdAndDelete(id);
        if(!incident){
            return res.status(404).json({
                success:false,
                message:"Incident not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Incident deleted successfully",
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}

// analyze an incident

exports.analyzeIncident = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid Incident ID: "${id}"`,
            });
        }
        const result = await analyzeIncident(id);
        const aiAnalysis = result?.aiAnalysis || result?.incident?.aiAnalysis || null;
        const incident = result?.incident || result;

        res.status(200).json({
            success: true,
            aiAnalysis,
            incident,
            ticket: result?.ticket || null,
            data: {
                ...result,
                aiAnalysis,
                incident,
                image: incident?.image,
                machine: incident?.machine,
            },
        });
    } catch (err) {
        console.error("AI Analysis Controller Error:", err);
        const status = err.message && err.message.includes("not found") ? 404 : 500;
        res.status(status).json({
            success: false,
            message: err.message || "Failed to analyze incident",
        });
    }
};