const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controlador/loginAdmin");

router.post("/login-admin", loginAdmin);

module.exports = router;
