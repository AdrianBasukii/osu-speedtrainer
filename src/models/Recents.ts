import mongoose from "mongoose"

const recentsSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    setDate: {type: Date, expires: '1m', default: Date.now, required: true},
    mode: {type: String, required: true},
    duration: {type: Number, required: true},
    clicks: {type: Number, required: true},
    bpm: {type: Number, required: true},
    consistency: {type: Number, required: true},
})

const Recents = mongoose.models.Recents || mongoose.model("Recents", recentsSchema)

export default Recents