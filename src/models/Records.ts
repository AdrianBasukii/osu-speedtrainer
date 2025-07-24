import mongoose from "mongoose"

const statisticsSchema = new mongoose.Schema({
    "TotalTests": {type: Number, default: 0},
    "TimeTrained": {type: Number, default: 0},
    "TotalConsistency": {type: Number, default: 0},
}, { _id : false })

const dataSchema = new mongoose.Schema({
    bpmValue: { type: Number, default: 0 },
    setAt: { type: Date }
}, { _id : false })

const keyDataSchema = new mongoose.Schema({
    time:{
        "5s": { type: dataSchema, default: () => ({})},
        "10s": { type: dataSchema, default: () => ({})},
        "15s": { type: dataSchema, default: () => ({})},
        "20s": { type: dataSchema, default: () => ({})},
        },
    clicks:{
        "50": { type: dataSchema, default: () => ({})},
        "100": { type: dataSchema, default: () => ({}) },
        "150": { type: dataSchema, default: () => ({}) },
        "200": { type: dataSchema, default: () => ({}) },
    }
}, { _id : false })

const recordsSchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    "statistics":{type: statisticsSchema, default: () => ({})},
    "1key": {type: keyDataSchema, default: () => ({})},
    "2key": {type: keyDataSchema, default: () => ({})}
})

const Records = mongoose.models.Records || mongoose.model("Records", recordsSchema)

export default Records