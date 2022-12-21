const UserModel = require("../Models/UserModel");
const jwt = require('jsonwebtoken');

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      await jwt.verify(
        token,
        process.env.SECRET_KEY,
        async (err, decodedToken) => {
          if (err) return next({status: false });
          else {
            req.userId = decodedToken.userId;
              const user = await UserModel.findById(decodedToken.userId);
            if (user) return next({status: true });
            else return next({status: false });
          }
        }
      );
    }else return next({status: false });
  } catch (error) {
    return next({status: false , error});
  }
};

module.exports = isAuthenticatedUser;