const AdminModel = require('../Models/AdminModel')
const jwtAdmin = require("jsonwebtoken");

maxAge = 3 * 24 * 60 * 60;

const createToken = (adminId) => {
    return jwtAdmin.sign({ adminId }, process.env.SECRET_KEY, {
      expiresIn: maxAge,
    });
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

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.adminLogin(email, password);
        const token = createToken(admin._id);

        res.cookie("jwtAdmin", token, {
          withCredentials: true,
          httpOnly: false,
          maxAge: maxAge * 1000,
        });

        res.status(201).json({ admin: admin._id, created: true });

    } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.json({ errors, created: false });
    }
}