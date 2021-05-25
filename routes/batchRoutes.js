const express = require("express");
const batchController = require("../controllers/batchController");
const router = express.Router();

router.route("/").get(batchController.getAllBatches);
router.route("/:batchId").get(batchController.getBatch);

router.route("/:batchId/:updateType").patch(batchController.updateBatch);

module.exports = router;
