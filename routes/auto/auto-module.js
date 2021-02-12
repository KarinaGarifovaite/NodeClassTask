const mongoose = require("mongoose");


let AutoSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    makeDate: {
        type: Date,
        required: true
    },
    rida: {
        type: Number,
        required: true
    },
    gearbox: {
        type: String,
        required: true
    }
})

let Auto = mongoose.model("Auto", AutoSchema);



module.exports = Auto;