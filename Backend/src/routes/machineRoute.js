const express = require('express');
const router = express.Router();

const {
    createMachine,
    getMachine,
    getMachineById,
    updateMachineById,
    deleteMachineById,
} = require('../controllers/machineController');

// GET all machine
// GET all machines
router.get("/", getMachine);

// GET machine by ID
router.get("/:id", getMachineById);

// POST create machine
router.post("/", createMachine);

// PUT update machine
router.put("/:id", updateMachineById);

// DELETE machine
router.delete("/:id", deleteMachineById);

module.exports = router;