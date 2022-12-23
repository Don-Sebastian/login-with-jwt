// const Dashboard = require("../../client/src/Pages/Admin/Dashboard");
const { adminUserList, adminEditUser, postAdminEditUser, deleteUserAdmin, createUserAdmin } = require("../Controllers/AdminController");
const { adminLogin } = require("../Controllers/AuthAdminController");
const { checkAdmin } = require("../Middlewares/AuthMiddlewares");

const isAuthenticatedAdmin = require("../Middlewares/AuthAdmin");
const router = require("express").Router();

router.post('/dashboard', checkAdmin)
router.post("/login", adminLogin);

router.get("/user-list", isAuthenticatedAdmin, adminUserList);
router.get("/edit-user/:id", isAuthenticatedAdmin, adminEditUser);
router.post("/edit-user", isAuthenticatedAdmin, postAdminEditUser);
router.delete("/delete-user/:id", isAuthenticatedAdmin, deleteUserAdmin);
router.post("/create-user-backend", isAuthenticatedAdmin, createUserAdmin);

module.exports = router;