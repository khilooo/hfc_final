const { dbObj } = require('../db/DbGlobal');
const mongoose = require("mongoose");
const {PlayerService} = require("./PlayerService");





const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    score: Number,
    matchDay: Date,
    date: Date
});

const RegisterModel = mongoose.model('Register', registerSchema);

class RegisterService {

    static async registerPlayer(email) {
        try {
            const playerToRegister = await PlayerService.findPlayerByMail(email);

            dbObj().collection('Register').insertOne({name: playerToRegister.name,
                email: playerToRegister.email,
                score: playerToRegister.score,
                matchDay: new Date().toISOString(),
                date: new Date().toISOString()

            }
            );

            console.log('Player saved:');
        } catch (error) {
            console.error('Error saving player:', error.message);
        }

    }

    static async undoRegisterPlayer(email) {
        let deleteQuery = {email: email}
        const res = await dbObj().collection('Register').deleteOne(deleteQuery);
        if(res.deletedCount === 0) {
            console.log('Player not found');
        } else {
            console.log(`Player ${email} deleted`);
        }
    }

    static async getRegisteredByMail(email) {
        const collection = dbObj().collection('Register');
        return await collection.findOne({email: email});
    }




    static async getAllRegisteredPlayers(date) {
        const collection = dbObj().collection('Register');
        var startDate = new Date(date);
        var yesterday = new Date(startDate);
        yesterday.setDate(startDate.getDate() - 1);

         console.log(date);

       return await collection.find({"matchDay": {"$gte": yesterday.toISOString(), "$lt":startDate.toISOString() }}).toArray(function(err, docs) {
           console.log(docs)
           if (err) {
               console.error('Error executing query:', err);
               return;
           }

       });

    }
        // This is where the logic to find a player by mail would go


}
module.exports = {RegisterService};