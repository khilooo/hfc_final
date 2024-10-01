const express = require("express");
const router = express.Router();
const {PlayerService} = require('../services/PlayerService')




module.exports = {

    login:async function(req,res)
    {
        var player = await PlayerService.findPlayerByMail(req.body.email);
        if (!player) {
            return res.status(404).json({message: 'Player not found'});
        }
        // Return a success status or data if login is successful
        return res.status(200).json({ message: 'Login successful', player });
    }

}

