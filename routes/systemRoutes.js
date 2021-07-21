const router = require("express").Router();
const systemController = require("../controllers/systemController");
const authController = require("../controllers/authController");

router.use(authController.protect);
router.route("/historian").get(systemController.getSystemHistorian);
router.route("/identities").get(systemController.getSystemIdentities);
router.route("/historian/:id").get(systemController.getSystemHistorianById);
router.route("/identities/:id").get(systemController.getSystemIdentitiesById);

module.exports = router;
