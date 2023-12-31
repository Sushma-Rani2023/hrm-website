const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {

    const token = req.headers.authorization.split(" ")[1];
   // console.log(token);
    const verify = await jwt.verify(token, process.env.KEY);
    //console.log(verify, "verify1234");
    req.userId = verify.userId;
    next();
    //console.log("token validated");
  } catch (error) {
    return res.status(401).json({
      msg: "invalid token",
    });
  }
};
