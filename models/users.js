var orm = require("../config/orm.js");

var users = {
    //insert new signup user
    insert : function(username, email, password_hash, cb){
        orm.insert("users", "(name, email, password_hash)", [username, email, password_hash], (error)=>{
            //if (error) return console.log(error);
            cb(error);
        });
    },

    // return all users info
    selectAll : function(cb){
        orm.selectAll("users", (results)=>{
            cb(results);
        });
    },

    // return selected user info
    selectUser : function(useremail, cb){
        orm.selectCertain("users", "email", useremail, (result)=>{
            cb(result);
        });
    },

    selectUserid : function(userid, cb){
        orm.selectCertain("users", "id", userid, (result)=>{
            cb(result);
        });
    }

    // update selected user's email
    // updateEmail : function(username, email, cb){
    //     orm.update("users", "email", "name", [email, username], ()=>{
    //         cb();
    //     });
    // }
};

module.exports = users;