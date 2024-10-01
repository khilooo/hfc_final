const mongoose = require('mongoose');
const {MongoClient, ObjectId } = require("mongodb");
const {DbManager} = require("../db/DbManager");
const { dbObj } = require('../db/DbGlobal');





const playerSchema = new mongoose.Schema({
    name: String,
    score: Number,
    email: String
});



const PlayerModel = mongoose.model('Player', playerSchema);

class PlayerService {



    static async savePlayer(name, score) {
        try {

            const newPlayer = PlayerModel({name, score,email});
            const savedPlayer = await newPlayer.save();
            console.log('Player saved:', savedPlayer);
        } catch (error) {
            console.error('Error saving player:', error.message);
        }
    }


    static async findPlayerByMail(email) {
        try {

            const collection = dbObj().collection('Player');
            const player = await collection.findOne({ email: email });
            if(player) {
                const groupList = await PlayerService.handlePlayerPermission(player.name,player.permissionsGroupId);
                player.groupList = groupList;
            }
            return player

        } catch (error) {
            console.error('Error finding player:', error.message);
        }
    }

    static async handlePlayerPermission(name,permissionsGroupIds)  {
        let playerPermissionsList = [];
        try {
            const permissionGroup = dbObj().collection('PermissionGroup');
            for(const permission of  permissionsGroupIds) {
                let res = await permissionGroup.findOne({_id:new ObjectId(permission)});
                playerPermissionsList = playerPermissionsList.concat(res?.groupList);
            }
        } catch (error) {
            console.error(`Error fetching/setting permission for player ${name}  error : ${error.message}`);
        }
             return playerPermissionsList;
    }
}
module.exports = {PlayerService};