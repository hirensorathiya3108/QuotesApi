const express = require("express");
const router = express.Router();

const {getAllQuotes, getAllQuotesTesting} = require("../controllers/quotes");

router.route("/").get(getAllQuotes);
router.route("/testing").get(getAllQuotesTesting)

module.exports = router;