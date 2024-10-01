const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/hfc'; // Replace with your actual MongoDB connection string

let database = null;
const { setDbObject } = require('./DbGlobal');




class DbManager {


     static async initializeDatabase() {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            console.log('Connected to MongoDB');
            database = client.db('hfc');
            setDbObject(database);
        } catch (err) {
            console.error('MongoDB connection error:', err);
        }
    };

    static  getDbObject() {
        if (!database) {
            throw new Error('Database not initialized. Call initializeDatabase first.');
        }
        return database;
    }

}

module.exports = {DbManager};