const mongoose = require('mongoose'); 

const connectDB = async () =>{
    try{
        const response = await mongoose.connect(process.env.MONGO_URI,{
        })
        console.log(`MongoDB connected: Successfully`);
    } catch (error) {
        console.warn(`MongoDB Connection Notice: ${error.message}. Running in fallback mode.`);
    }

}

module.exports = connectDB; 