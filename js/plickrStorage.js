var storage = {};
var dbSize = 5 * 1024 * 1024;
storage.webdb = {};
storage.webdb.db = null;

storage.webdb.open = function () {
    storage.webdb.db = openDatabase("PlickrDB", "1", "Plickr Database", dbSize);
};

storage.webdb.onError = function (txn, e) {
   if(e!=null){
       console.log(e);
   }
};

storage.webdb.onSuccess = function (txn, e) {
    var last_id=((e.insertId)!=null)?e.insertId:0;
   PlickrNotify();
    console.log("Query executed Successfully! ID:" + last_id);
};

storage.webdb.createTable = function () {
    storage.webdb.db.transaction(function (db) {
        db.executeSql("CREATE TABLE IF NOT EXISTS `grabbed`(grab_id INTEGER PRIMARY KEY AUTOINCREMENT,gid INTEGER,user INTEGER,title VARCHAR,payload TEXT,datatype VARCHAR  DEFAULT 'txt',device_id VARCHAR DEFAULT 0,device_type VARCHAR DEFAULT 'N/A',device_name VARCHAR DEFAULT 'N/A',device_display_name VARCHAR DEFAULT 'N/A',added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,synced INTEGER DEFAULT 0)");
    },storage.webdb.onSuccess, storage.webdb.onError);
};

storage.webdb.insertData = function (data) {
    storage.webdb.db.transaction(function (db) {
        var gid = data.gid;
        var user = data.uid;
        var title = ((data.title) != "" || (data.title) != null) ? (data.title).substring(0,80) : "N/A";
        var payload = ((data.payload) != "" || (data.payload) != null) ? data.payload : "N/A";
        var device_id = ((data.device_id) != "" || (data.device_id) != null) ? data.device_id : "0";
        var device_type = ((data.device_type) != "" || (data.device_type) != null) ? data.device_type : "N/A";
        var datatype = ((data.datatype) != "" || (data.datatype) != null) ? data.datatype : "txt";
        var device_name = ((data.device_name) != "" || (data.device_name) != null) ? data.device_name : "N/A";
        var device_display_name = ((data.device_display_name) != "" || (data.device_display_name) != null) ? data.device_display_name : "N/A";
        var added_on = ((data.added_on) != "" || (data.added_on) != null) ? data.added_on : "0000-00-00";
        var synced = ((data.synced) != "" || (data.synced) != null) ? data.synced : "0";

       db.executeSql("INSERT INTO grabbed(gid,user,title,payload,device_id,datatype,device_type,device_name,device_display_name,added_on,synced) " +
            "VALUES(?,?,?,?,?,?,?,?,?,?,?)", [gid, user, title, payload, device_id,datatype, device_type, device_name, device_display_name, added_on, synced]
/*
 db.executeSql("INSERT INTO grabbed(gid,user,title,payload,device_id,datatype,synced) " +
            "VALUES(?,?,?,?,?,?,?)", [gid, user, title, payload, device_id,datatype, synced]*/

            ,
            storage.webdb.onSuccess, storage.webdb.onError);

    });

};

storage.webdb.grabAllData = function (onSuccessCallbackFunction) {
    var db = storage.webdb.db;
    db.transaction(function (txn) {
        txn.executeSql("SELECT grab_id,gid,title,device_type,added_on,synced FROM grabbed ORDER BY grab_id DESC", [], onSuccessCallbackFunction,
            storage.webdb.onError);
    });
};
storage.webdb.grabDataByLimit= function (limit,onSuccessCallbackFunction) {
    var db = storage.webdb.db;
    db.transaction(function (txn) {
        txn.executeSql("SELECT grab_id,gid,title,device_type,added_on,synced FROM grabbed ORDER BY grab_id DESC LIMIT "+limit, [], onSuccessCallbackFunction,
            storage.webdb.onError);
    });
};

storage.webdb.grabData = function (grab_id,onSuccessCallbackFunction) {
    var db = storage.webdb.db;
    db.transaction(function (txn) {
        txn.executeSql("SELECT grab_id,title,payload,device_type,device_name,device_display_name,added_on,synced FROM grabbed where grab_id="+grab_id+" ORDER BY grab_id DESC", [], onSuccessCallbackFunction,
            storage.webdb.onError);
    });
};


storage.webdb.open();
storage.webdb.createTable();

function setLocalData(obj){
    chrome.storage.local.set(obj,function(){
        if(chrome.runtime.error) {
            console.log(chrome.runtime.error);
            return false;
        }else{
            return true;
        }
    });

}

function getLocalData(key){

    chrome.storage.local.get(""+key,function(obj){
        if (chrome.runtime.error) {
            console.log(chrome.runtime.error);
            return null;
        }else{
            return obj;
        }
    });
}

