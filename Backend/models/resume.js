const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema({
    text: String, // Parsed resume text
    uploadedAt: { type: Date, default: Date.now } // Timestamp of when the resume was uploaded
});


const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;