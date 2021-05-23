const express = require("express");
const scmuserController = require("../controllers/scmuserController");

const router = express.Router();

router.route("/").post(scmuserController.createSCMUser);
router.route("/:role/:userId").get(scmuserController.getSCMUserById);
router.route("/:role").get(scmuserController.getSCMUsers);

module.exports = router;
