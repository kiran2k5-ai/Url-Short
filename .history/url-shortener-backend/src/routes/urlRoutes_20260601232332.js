const express = require("express");
const router = express.Router();

router.post("/create");
router.get("/all");
router.delete("/:id");

module.exports = router;