const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../../middlewares/authenticate");
const router = Router();
router.get("/:id?", authenticate, controller.get);
router.post("/signup", controller.signup);
router.post("/login", controller.login);

module.exports = router;