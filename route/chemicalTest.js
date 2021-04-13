const express = require("express");

const router = express.Router();
const path = require('path')

router.get("/",(req, res)=> {
    var a = 1;
    console.log("here");
    res.render("test",{a:a})
});
module.exports = router;