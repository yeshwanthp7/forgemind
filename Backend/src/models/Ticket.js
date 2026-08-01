const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    id:{
        type:String
    },
    incidentId:{
        type:String
    },
    assignedTo:{
        type:String
    },
    status:{
        type:String,
        enum: ['open', 'in_progress', 'resolved'],
    },
    estimatedDownTime:{
        type:String
    },
    createdAt:{
        type:String
    },
    completedAt:{
        type:String
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)