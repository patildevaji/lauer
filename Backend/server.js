require("dotenv").config();
const express = require('express');
const app = express();
const connectDb = require ("./config/dbConnection");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
//const session =require('express-session');
//const passport= require('passport');
//const passportLocalMongoose= require('passport-local-mongoose');
//const GoogleStrategy= require('passport-google-oauth20').Strategy;
//const findOrCreate= require('mongoose-findorcreate');
const PORT = process.env.PORT || 3001;

connectDb();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.json());

const FormDataSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    // Add other fields as needed
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', FormDataSchema);

app.post('/api/formdata', (req, res) => {
    const formData = req.body;
    const newFormData = new FormData(formData);
    newFormData.save()
        .then(savedFormData => {
            res.status(201).json(savedFormData);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

//app.use(cors({origin: "http://localhost:4200"}));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use("/api/ats", require('./routes/api/atsRoutes'));

app.use(verifyJWT);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});