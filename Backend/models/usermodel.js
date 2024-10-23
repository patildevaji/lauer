const mongoose = require("mongoose");


const userSchema=  mongoose.Schema({
    
    
    firstname: {
        type: String,
        required: [false, 'please enter First name'],
        unique: true,
    },
    lastname: {
        type: String,
        required: [false, 'please enter Last name'],
    },
    username: {
        type: String,
        required: [true, 'please enter  username'],
    },
    address: {
        type: String,
        required: [false, 'please enter Street name'],
    },
    plz: {
        type: Number,
        required: [false, 'please enter Postleitzahl'],
    },
    city: {
        type: String,
        required: [false, 'please enter City name'],
    },
    country: {
        type: String,
        required: [false, 'please enter Country name'],
    },
    email: {
        type: String,
        required: [false, 'please enter Email address'],
        unique: true,
    },
    date_of_birth : {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: [false, 'please enter Phone number with country code'],
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'please enter user password'],
    },
    roles: {
        User: {
            type: Number,
            default: 2
        },
        
        Admin: Number
    },
    
    linkedin: {
        type: String
    },
    image: {
        type: String
    },
    cvFile: {
        type: String
    },
    coverLetterFile: {
        type: String
    },
    jobid: {
        type: Number,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    progressBar: {
        type: String,
        required: false,
    }


        
    
    

},{timestamps:true}
);

module.exports = mongoose.model('User', userSchema);