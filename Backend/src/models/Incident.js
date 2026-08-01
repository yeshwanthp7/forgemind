const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Image uploaded by the worker
    image: {
      type: String,
      required: true,
    },

    // Worker's description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Current incident status
    status: {
      type: String,
      enum: ["Pending", "Under Review", "In Progress", "Resolved"],
      default: "Pending",
    },

    // AI Analysis Result
    aiAnalysis: {
      severity: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
      },

      riskScore: {
        type: Number,
        min: 0,
        max: 100,
      },

      rootCause: {
        type: String,
      },

      recommendation: {
        type: String,
      },

      confidence: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Incident", incidentSchema);