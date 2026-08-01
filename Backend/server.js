const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); 
const connectDB = require("./src/config/db"); // Import the connectDB function
const machineRoutes = require("./src/routes/machineRoute");
const incidentRoutes = require("./src/routes/incidentRoute");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
app.use("/api/machines", machineRoutes);
app.use("/api/incidents", incidentRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});