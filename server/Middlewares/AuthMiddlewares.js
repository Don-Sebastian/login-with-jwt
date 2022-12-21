const UserModel = require('../Models/UserModel');
const jwtAdmin = require('jsonwebtoken');
const jwt = require("jsonwebtoken");
const AdminModel = require('../Models/AdminModel');

module.exports. checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        await jwt.verify(token, `${process.env.SECRET_KEY}`, async (err, decodedToken) => {
          if (err) {
                res.json({ status: false })
                next();
          } else {
            req.userId = decodedToken.userId;
            const user = await UserModel.findById(decodedToken.userId);
                if (user) res.json({ status: true, user: user })
                else res.json({ status: false })
                next();
            }
        });
    } else {
        res.json({ status: false });
        next();
    }
}

module.exports.checkAdmin = async (req, res, next) => {
  const token = req.cookies.jwtAdmin;
    if (token) {
      await jwtAdmin.verify(
        token,
        `${process.env.SECRET_KEY}`,
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
            next();
          } else {
            const admin = await AdminModel.findById(decodedToken.adminId);
            if (admin) res.json({ status: true, admin: admin.email });
            else res.json({ status: false });
            next();
          }
        }
      );
    } else {
      res.json({ status: false });
      next();
    }
}