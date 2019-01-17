var orm = require("../config/orm.js");

var users = {
    //insert new signup user
    insert : function(username, email, password_hash, cb){
        orm.insert("users", "(name, email, password_hash)", [username, email, password_hash], ()=>{
            //if (error) return console.log(error);
            cb();
        });
    },

    // return all users info
    selectAll : function(cb){
        orm.selectAll("users", (results)=>{
            cb(results);
        });
    },

    // return selected user info
    selectUser : function(username, cb){
        orm.selectCertain("users", "name", username, (result)=>{
            cb(result);
        });
    },

    // update selected user's email
    updateEmail : function(username, email, cb){
        orm.update("users", "email", "name", [email, username], ()=>{
            cb();
        });
    }
};

module.exports = users;