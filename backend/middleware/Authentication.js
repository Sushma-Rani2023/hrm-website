const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    console.log('ttttttttttttttttt')
      try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, process.env.KEY);
        console.log(verify);
        req.userId = verify.userId;
        next();
        console.log('token validated')
      }
      catch(error){
       return res.status(401).json({
        msg: 'invalid token'
       })
      }
}