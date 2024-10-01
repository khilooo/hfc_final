const PlayerController = require('../controllers/PlayerController');
const LoginController = require('../controllers/LoginController');
const YoutubeController = require('../controllers/YouTubeController');
const RegisterController = require('../controllers/RegisterController');

const routes = [
    { method: 'GET', path: '/players', controller: PlayerController.getPlayer },
    { method: 'GET', path: '/captions', controller: YoutubeController.getVideoCaptions },
    { method: 'POST', path: '/login', controller: LoginController.login },
    { method: 'POST', path: '/videos', controller: YoutubeController.getVideosList },
    { method: 'GET', path: '/oauth2callback', controller: YoutubeController.handleOAuthCallback}, // Route for OAuth2 callback
    { method: 'GET', path: '/abc', controller: YoutubeController.handleOAuthCallback} ,
    { method: 'POST', path: '/register', controller: RegisterController.registerPlayer} ,// Route for OAuth2 callback
    { method: 'POST', path: '/undoRegister', controller: RegisterController.undoRegisterPlayer} ,// Route for OAuth2 callback
    { method: 'GET', path: '/getAllRegistered', controller: RegisterController.getAllRegisteredPlayers} ,// Route for OAuth2 callback
    { method: 'GET', path: '/getRegisteredByMail', controller: RegisterController.getRegisteredByMail} // Route for OAuth2 callback


];

module.exports = routes;