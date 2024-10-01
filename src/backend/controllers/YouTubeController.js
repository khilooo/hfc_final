const express = require("express");
const {YouTubeService} = require("../services/YouTubeService");
const {OAuth2Client} = require("google-auth-library");
const credentials = require("../auth/credentials.json");
const {google} = require("googleapis");


const scopes = ['https://www.googleapis.com/auth/youtube.force-ssl','https://www.googleapis.com/auth/youtubepartner','https://www.googleapis.com/auth/youtube.readonly'];
const oAuth2Client = new OAuth2Client(
    credentials.web.client_id,
    credentials.web.client_secret,
    'http://localhost:8081/oauth2callback'
);

google.options({auth: oAuth2Client});


module.exports = {

    getVideosList:async function(req,res)
    {
        const videos = await YouTubeService.searchVideos(req.body.search);
        console.log(videos);
        res.json(videos);
        return res.status(200);
    },

    handleOAuthCallback:async function(req,res)
    {
        const code = req.query.code;
        const {tokens} = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        res.redirect('/youtube');
    },

    getVideoCaptions :async function (req,res) {


        try {


            const captions = await YouTubeService.getCaptions(req.query.videoId)
            console.log(captions);
            res.json(captions);
            return res.status(200);
        } catch (error) {
            console.error('Error fetching captions:', error);
            return null;
        }
    }



}

