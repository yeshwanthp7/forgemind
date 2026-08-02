// backend/src/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
  },
  incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
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
    default: 'P4 Low',
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Pending Parts', 'Investigating', 'Review', 'Resolved', 'Closed'],
    default: 'Open',
  },
  assignedTo: {
    type: String,
    default: 'Maintenance Team',
  },
  estimatedDowntime: {
    type: String,
    default: 'N/A',
  },
  dueDate: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: String,
    default: 'AI',
  },
  aiAnalysis: {
    severity: { type: String, default: 'Unknown' },
    riskScore: { type: Number, default: 0 },
    rootCause: { type: String, default: 'N/A' },
    recommendation: { type: String, default: 'N/A' },
    confidence: { type: Number, default: 0 },
  },
  completedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // Adds createdAt & updatedAt automatically
});

// Pre-save hook to generate ticketId if not provided
ticketSchema.pre('save', async function() {
  if (this.isNew && !this.ticketId) {
    const lastTicket = await this.constructor.findOne({}, {}, { sort: { 'createdAt': -1 } });
    let nextIdNum = 1;
    if (lastTicket && lastTicket.ticketId) {
      const lastNum = parseInt(lastTicket.ticketId.split('-')[1]);
      if (!isNaN(lastNum)) {
        nextIdNum = lastNum + 1;
      }
    }
    this.ticketId = `WO-${String(nextIdNum).padStart(4, '0')}`;
  }
});

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
module.exports.default = Ticket;