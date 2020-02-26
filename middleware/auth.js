const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {

    const token = req.header('x-auth-token');
    //get token from header
    if(!token){
        return res.status(401).json({msg:'No token,authorization header'});
    }

    //Verify token
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(404).json({msg:'Token is not valid'});
    }
}