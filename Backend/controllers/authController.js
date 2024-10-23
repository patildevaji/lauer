const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');



const login = asyncHandler(async (req, res) => {
    const {email, password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('all field are mandatory');
    }
    const loginuser= await User.findOne({email});
    //compare password with hashed password
    if(loginuser && (await bcrypt.compare(password, loginuser.password))){
        const roles= Object.values(loginuser.roles).filter(Boolean);
        const accessToken= jwt.sign({
            "UserInfo": {
                "username": loginuser.username,
                "roles": roles
            }
                
            },
         process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15m'}
        );
        const refreshToken = jwt.sign(
            { "username": loginuser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        loginuser.refreshToken = refreshToken;
        const result = await loginuser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }

});

module.exports = { login };