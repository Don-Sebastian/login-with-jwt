const { register, login } = require('../Controllers/AuthController');
const { updateProfileImage } = require('../Controllers/UserController');
const { checkUser } = require('../Middlewares/AuthMiddlewares');
const { upload } = require('../Middlewares/Multer');
const isAuthenticatedUser = require("../Middlewares/AuthUser");


const router = require('express').Router();

router.post("/", checkUser);
router.post('/register', register);
router.post('/login', login);
router.post("/update-image",upload.any("Image"), isAuthenticatedUser, updateProfileImage);

module.exports = router;