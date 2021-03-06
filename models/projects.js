var orm = require("../config/orm.js");

var projects = {
    // create new project
    insert : function(projectName, projectDescription, creator_id, cb){
        orm.insert("projects", "(name, project_description, creator_id)", [projectName, projectDescription, creator_id], (err, result)=>{
            cb(err, result);
        });
    },

    //returns all projects in the database
    selectAll : function(cb){
        orm.selectAll("projects", (results)=>{
            cb(results);
        });
    },

    getProjectName : function(id, cb){
        orm.selectCertain("projects", "id", id, (results)=>{
            cb(results);
        });
    },

    //return all projects that the user created
    selectProjects : function(creator_id, cb){
        orm.selectCertain("projects", "creator_id", creator_id, (results)=>{
            cb(results);
        });
    },

    //update project name
    rename : function(project_id, project_name, cb){
        orm.update("projects", "name", "id", [project_name, project_id], ()=>{
            cb();
        });
    },

    editDescription : function(project_id, project_description, cb){
        orm.update("projects", "project_description", "id", [project_description, project_id], ()=>{
            cb();
        });
    },

    //delete project and related info from user
    delete : function(project_id, cb){
        orm.delete("todos", "project_id", project_id, ()=>{
            orm.delete("users_projects", "project_id", project_id, ()=>{
                orm.delete("projects", "id", project_id, ()=>{
                    cb();
                });
            });
        });
    }
};

module.exports = projects;