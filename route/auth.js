const express = require("express");
const authRouter = express.Router()
const { registration, loginUser, resetPassword, sendResetLink, logout } = require("../controllers/auth")

authRouter.post("/register", registration);
authRouter.post("/login", loginUser);
authRouter.put("/reset/:token", resetPassword);
authRouter.put("/reset-link", sendResetLink);
authRouter.delete("/logout",  logout)

module.exports = authRouter;