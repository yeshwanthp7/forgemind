const Machine = require("../models/Machine");

// create machine
exports.createMachine = async (req, res) => {
    try {
        const {
            machineId,
            name,
            location,
            department,
            status,
            manufacturer,
            lastMaintained,
        } = req.body;

        const newMachine = new Machine({
            machineId,
            name,
            location,
            department,
            status,
            manufacturer,
            lastMaintained,
        });

        await newMachine.save();

        res.status(201).json({
            success: true,
            message: "Machine created successfully",
            data: newMachine,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create machine",
            error: error.message,
        });
    }
};

// GET all machine
exports.getMachine = async (req, res) => {
    try {

        const machines = await Machine.find();

        res.status(200).json({
            success: true,
            count: machines.length,
            data: machines,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch machines",
            error: error.message,
        });
    }
};

// get machine by id

exports.getMachineById = async (req, res) => {
    try {

        const { id } = req.params;

        const machine = await Machine.findById(id);

        if (!machine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found",
            });
        }

        res.status(200).json({
            success: true,
            data: machine,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch machine",
            error: error.message,
        });
    }
};

// update machine by id
exports.updateMachineById = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedMachine = await Machine.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedMachine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Machine updated successfully",
            data: updatedMachine,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update machine",
            error: error.message,
        });
    }
};

// delete machine by id
exports.deleteMachineById = async (req, res) => {
    try {

        const { id } = req.params;

        const deletedMachine = await Machine.findByIdAndDelete(id);

        if (!deletedMachine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Machine deleted successfully",
            data: deletedMachine,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete machine",
            error: error.message,
        });
    }
};