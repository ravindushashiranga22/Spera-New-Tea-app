const mongoose = require('mongoose');

module.exports.createDatabaseConnection = ()=>{
    mongoose.connect(process.env.DATABASE_URL, 
        { serverSelectionTimeoutMS: 5000 });
    
    
    mongoose.connection.on("connected", ()=> {
        console.log("Connected to MongoDB");
    })
    
    mongoose.connection.on("error", (error)=> {
        console.log("MongoDB connection error:" , error);
    });
    
}
