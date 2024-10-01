const express = require('express');
const cors = require('cors');
const { DbManager } = require('./db/DbManager');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

const routes = require('./config/routes')
const {setDbObject} = require("./db/DbGlobal");
app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(router);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));


// Use an asynchronous setup function
async function setup() {
    try {
        // Check for a successful connection

        await DbManager.initializeDatabase();


        // Use the routes defined in the mapping file
        routes.forEach(({ method, path, controller }) => {
            app[method.toLowerCase()](path, controller);
        });

        // Define routes after the database is initialized


        app.listen(8081, () => {
            console.log("Listening on port 8081");
        });
    } catch (error) {
        console.error('Error setting up the server:', error);
    }
}

// Call the setup function
setup();