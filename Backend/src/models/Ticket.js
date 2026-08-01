const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        incident: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Incident",
            required: true,
        },

        machine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Machine",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            required: true,
        },

        assignedTo: {
            type: String,
            default: "Maintenance Team",
        },

        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved"],
            default: "Open",
        },

        estimatedDowntime: {
            type: String,
        },

        createdBy: {
            type: String,
            default: "AI",
        },

        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Ticket", ticketSchema);