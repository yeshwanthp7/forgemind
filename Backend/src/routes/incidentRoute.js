const express = require("express");

const router = express.Router()
const upload = require('../middleware/uploadMiddleware')
const {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident,
    deleteIncident,
    analyzeIncident
} = require('../controllers/incidentController')

router.get('/', getIncidents)
router.get('/:id', getIncidentById)
router.post('/', upload.single('image'), createIncident)
router.put('/:id', updateIncident)
router.delete('/:id', deleteIncident)
router.post('/:id/analyze', analyzeIncident)
module.exports = router;