
// DbGlobal.js

let dbObj = null;


    function setDbObject(dbObject) {
        dbObj= dbObject;
    }

    function  getDbObject() {

        return dbObj;
    }


module.exports = { setDbObject,  dbObj: getDbObject };