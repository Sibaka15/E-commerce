const mongoose = require('mongoose')


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDb Connected Successfully');
        
    } catch (error) {
        console.log('MongoDb Connection failed',error);
        process.exit(1)
    }
}

module.exports = connectDB