const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

try {
  var AuthenticateToken = (req, res, next) => {
    // console.log(req.headers.authorization);

    let token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (token) {
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(200).json({ status: false, message: "Invalid token." });
        } else {
          req.user = decoded;
          // console.log(req.user.user_id);
          next();
        }
      });
    } else {
      res.status(200).json({ status: false, message: "Missing token." });
      return;
    }
  };
} catch (err) {
  res.status(400).json({ status: false, message: err });
}

module.exports = { AuthenticateToken };
