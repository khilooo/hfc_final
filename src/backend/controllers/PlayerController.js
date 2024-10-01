const express = require("express");
const router = express.Router();
const {PlayerService} = require("../services/PlayerService");




module.exports = {

    getPlayer:async function(req,res)
    {
        const players = await PlayerService.findPlayerByMail(req.body);
        console.log(players);
        res.json(players);
        return res.status(200);
    }
}

