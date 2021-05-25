const express = require("express");
const contractController = require("../controllers/contractController");
const router = express.Router();

router
  .route("/")
  .get(contractController.getAllContracts)
  .post(contractController.createContract);

router
  .route("/:contractId")
  .get(contractController.getContract)
  .patch(contractController.addContractParticipants);

module.exports = router;
