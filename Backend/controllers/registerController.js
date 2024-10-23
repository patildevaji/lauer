const asyncHandler = require('express-async-handler');

const bcrypt = require('bcrypt');
const User = require('../models/usermodel');

const registerUser = asyncHandler(async (req, res) => {
    
    const {username, email, password}= req.body;
    if(!username || !email || !password ){
        
        return res.status(400).json('All fields mandatory!!');
    }
    const userAvailable= await User.findOne({email});
    if(userAvailable){
        
        return res.status(400).json('user already registered!!');
    }
    const hashedPassword= await bcrypt.hash(password, 10);//hash and salt
    //console.log('Hashed password:', hashedPassword);
    const newuser = new User({
        username,
        email, 
        password: hashedPassword,
       
    });
    newuser.save().then(()=>{
        res.send(newuser);
    }).catch((e)=>{
       return res.send(e);
    });
    //console.log( `user created ${loginuser} `);
    // if(loginuser){
    //     return res.status(201).json({_id:loginuser.id, email:loginuser.email});
    // } else{
        
    //     return res.status(400).json('user data is not valid');

    // }

});

module.exports = { registerUser };