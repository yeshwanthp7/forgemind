const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    id:{
        type:String
    },
    incident:{
        type:String
    },
    summary:{
        type:String
    },
    generatedByAI:{
        type:Boolean
    },
    pdfUrl:{
        type:String
    },
    createdAt:{
        type:String
    }
})

module.exports = mongoose.model('Report', incidentSchema)