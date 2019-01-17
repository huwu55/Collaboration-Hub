var orm = require("../config/orm.js");

var users_projects = {
    //create connection between user and project
    insert : function(user_id, project_id, cb){
        orm.insert("users_projects", "(user_id, project_id)", [user_id, project_id], ()=>{
            cb();
        });
    },

    //return all connections of users and projects from database
    selectAll : function(cb){
        orm.selectAll("users_projects", (results)=>{
            cb(results);
        });
    },

    //return all users that are working in the same project
    selectUsers : function(project_id, cb){
        orm.selectCertain("users_projects", "project_id", project_id, (results)=>{
            cb(results);
        });
    },

    // remove a user from this project, set all belongs_to as null
    removeUser : function(project_id, user_id, cb){
        orm.updateAnd("todos", "belongs_to", "belongs_to", "project_id", [null, user_id, project_id], ()=>{
            orm.deleteAnd("users_projects", "project_id", "user_id", [project_id, user_id], ()=>{
                cb();
            });
        });
    }
};

module.exports = users_projects;