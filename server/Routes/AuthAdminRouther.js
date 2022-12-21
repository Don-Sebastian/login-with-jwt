// const Dashboard = require("../../client/src/Pages/Admin/Dashboard");
const { adminLogin } = require("../Controllers/AuthAdminController");
const { checkAdmin } = require("../Middlewares/AuthMiddlewares");


const router = require("express").Router();

router.post('/dashboard', checkAdmin)
router.post("/login", adminLogin);

module.exports = router;