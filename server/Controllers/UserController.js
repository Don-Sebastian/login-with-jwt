const fs = require('fs')
const path = require("path");
const UserModel = require('../Models/UserModel')


exports.updateProfileImage = async (verify, req, res, next) => {
  
  if (verify.status) {
    try {
      const obj = {
        Image: `${req.files[0].filename}`,
        contentType: "image/png",
      };
      await UserModel.findOneAndUpdate({ _id: req.userId }, obj)
        .then((response) => {
          res.status(202).json({ Image: response.Image, updation: true , verified: verify.status});
        })
        .catch((err) => {
          res.json({ updation: false, verified: verify.status , error: err.message});
        });
    } catch (error) {
      res.json({ updation: false, verified: verify.status, error: error.message });
    }
  } else {
    res.json({ verified : verify.status});
  }
};
