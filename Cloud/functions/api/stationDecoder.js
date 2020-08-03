const express = require("express");
const router  = express.Router();

const stationCodetoName = require("../data/stationCodetoName.json");

router.get('/:stationDetail', (req, res, next)=>{
    const stationCode = req.params.stationDetail.toUpperCase();
    const stationNamefromCode = stationCodetoName[stationCode];
    
    if(stationNamefromCode !== undefined)
    {
        res.status(200).json({stationNamefromCode});
    }
    else
    {
        res.status(404).json("Invalid Details");
    }
});


module.exports = router;