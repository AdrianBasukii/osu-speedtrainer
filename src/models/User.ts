import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    colorScheme: {type: String, required: true, lowercase: true, default: "dark"},
    email: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    joindate: {type: Date, required: true, default: Date.now}
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User