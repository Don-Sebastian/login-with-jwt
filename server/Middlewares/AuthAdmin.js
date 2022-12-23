const AdminModel = require("../Models/AdminModel");
const jwtAdmin = require("jsonwebtoken");

const isAuthenticatedAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwtAdmin;
    if (token) {
      await jwtAdmin.verify(
        token,
        process.env.SECRET_KEY,
        async (err, decodedToken) => {
          if (err) return next({ status: false });
          else {
            req.adminId = decodedToken.adminId;
              const admin = await AdminModel.findById(decodedToken.adminId);
            if (admin) return next({ status: true });
            else return next({ status: false });
          }
        }
      );
    } else return next({ status: false });
  } catch (error) {
    return next({ status: false, error });
  }
};

module.exports = isAuthenticatedAdmin;
