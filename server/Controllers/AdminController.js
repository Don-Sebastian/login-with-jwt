const { verify } = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

exports.adminUserList = async (verify, req, res, next) => {
  if (!verify.status) res.json({ verifiedAdmin: verify.status });
  else {
    await UserModel.find()
      .then((result) =>
        res.status(200).json({ users: result, verifiedAdmin: verify.status })
      )
      .catch((err) =>
        res.json({ error: err.message, verifiedAdmin: verify.status })
      );
  }
};

exports.adminEditUser = async (verify, req, res, next) => {
  let userId = req.params.id;
  if (!verify.status) res.json({ verifiedAdmin: verify.status });
  else {
    await UserModel.findOne({ _id: userId })
      .then((result) =>
        res.status(200).json({ user: result, verifiedAdmin: verify.status })
      )
      .catch((err) =>
        res.json({ error: err.message, verifiedAdmin: verify.status })
      );
  }
};

exports.postAdminEditUser = async (verify, req, res, next) => {
  let userId = req.body.userDetails._id;
  if (!verify.status) res.json({ verifiedAdmin: verify.status });
  else {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { email: req.body.edit.email }
    )
      .then((result) =>
        res.status(200).json({ user: result, verifiedAdmin: verify.status })
      )
      .catch((err) =>
        res.json({ error: err.message, verifiedAdmin: verify.status })
      );
  }
};

exports.deleteUserAdmin = async (verify, req, res, next) => {
  let userId = req.params.id;
  console.log(req.params.id);

  if (!verify.status) res.json({ verifiedAdmin: verify.status });
  else {
    await UserModel.findByIdAndDelete(userId)
      .then((result) =>
        res.status(200).json({ user: result, verifiedAdmin: verify.status })
      )
      .catch((err) =>
        res.json({ error: err.message, verifiedAdmin: verify.status })
      );
  }
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect Email")
    errors.email = "This email is not registered";

  if (err.message === "Incorrect Password")
    errors.password = "Password is incorrect";

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties.message);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.createUserAdmin = async (verify, req, res, next) => {
  try {
    if (!verify.status) res.json({ verifiedAdmin: verify.status });
    else {
      const { email, password } = req.body;
      await UserModel.create({ email, password }).then((result)=> res
        .status(200)
          .json({ user: result, verifiedAdmin: verify.status, created: true }))
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ error: errors, created: false, verifiedAdmin: verify.status });
  }
};
