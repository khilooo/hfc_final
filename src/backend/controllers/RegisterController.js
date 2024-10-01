const express = require("express");
const router = express.Router();
const {RegisterService} = require("../services/RegisterService");


module.exports = {

    registerPlayer:async function(req,res)
        {
            const response = await RegisterService.registerPlayer(req.body.playerEmail);
            res.json(response);
            return res.status(200);
    },

    getAllRegisteredPlayers:async function(req,res) {
        try {
            const response = await RegisterService.getAllRegisteredPlayers(req.query.date);
            res.json(response);
            return res.status(200);
        }catch (error) {
            console.error('Error getting Registered players:', error.message);
            return res.status(500);
        }

    },

    getRegisteredByMail: async function(req,res) {
        try {
            const response = await RegisterService.getRegisteredByMail(req.query.email);
            res.json(response);
            return res.status(200);
        }catch (error) {
            console.error('Error getting Registered players:', error.message);
            return res.status(500);
        }
    },

    undoRegisterPlayer:async function(req,res) {
        try {
            const response = await RegisterService.undoRegisterPlayer(req.body.playerEmail);
            res.json(response);
            return res.status(200);
        }catch (error) {
            console.error('Error undoing player registration:', error.message);
            return res.status(500);
        }
    }
}