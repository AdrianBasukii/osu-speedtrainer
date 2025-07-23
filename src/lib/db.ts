import mongoose from "mongoose"

export const connectDB = async () => {
  if(mongoose.connection.readyState === 1){
    console.log("There is an existing connection")
    return
  }
  try{
    await mongoose.connect(process.env.MONGO_URI || "")
    console.log("Connected to MongoDB")
    
  } catch(error){
    console.log(error)
  }
}

export const disconnectDB = async () => {
  try{
    mongoose.connection.close()
    console.log("Connected to MongoDB closed")
  } catch(error){
    console.log(error)
  }
}