const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../../middlewares/authenticate");
const router = Router();
router.get("/:id?", authenticate, controller.get);
router.post("/",authenticate, controller.create);
router.put("/:id?", authenticate, controller.edit);
router.delete("/:id?",authenticate, controller.delete);

module.exports = router;