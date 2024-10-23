const mongoose = require("mongoose");

const jobSchema=  mongoose.Schema({
    
    jobid: {
        type: Number,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Job', jobSchema);