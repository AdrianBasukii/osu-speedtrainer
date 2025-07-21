import mongoose from "mongoose"

const recordsSchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    "1key":{
        time:{
            "5s": { type: Number, default: 0 },
            "10s": { type: Number, default: 0 },
            "15s": { type: Number, default: 0 },
            "20s": { type: Number, default: 0 },
        },
        clicks:{
            "50": { type: Number, default: 0 },
            "100": { type: Number, default: 0 },
            "150": { type: Number, default: 0 },
            "200": { type: Number, default: 0 },
        }
    },
    "2key":{
        time:{
            "5s": { type: Number, default: 0 },
            "10s": { type: Number, default: 0 },
            "15s": { type: Number, default: 0 },
            "20s": { type: Number, default: 0 },
        },
        clicks:{
            "50": { type: Number, default: 0 },
            "100": { type: Number, default: 0 },
            "150": { type: Number, default: 0 },
            "200": { type: Number, default: 0 },
        }
    }
})

const Records = mongoose.models.Records || mongoose.model("Records", recordsSchema)

export default Records