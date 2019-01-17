var orm = require("../config/orm.js");

var todos = {
    //create a new task of the project
    insert : function(task, project_id, belongs_to, finished, cb){
        orm.insert("todos", "(task, project_id, belongs_to, finished)", [task, project_id, belongs_to, finished], ()=>{
            cb();
        });
    },

    //returns all todo task info from database
    selectAll : function(cb){
        orm.selectAll("todos", (results)=>{
            cb(results);
        });
    },

    //return all todo task of the project
    selectTodo : function(project_id, cb){
        orm.selectCertain("todos", "project_id", project_id, (results)=>{
            cb(results);
        });
    },

    updateBelongsTo : function(todo_id, user_id, cb){
        orm.update("todos", "belongs_to", "id", [user_id, todo_id], ()=>{
            cb();
        });
    },

    updateTask : function(todo_id, task, cb){
        orm.update("todos", "task", "id", [task, todo_id], ()=>{
            cb();
        });
    },

    updateFinished : function(todo_id, finished, cb){
        orm.update("todos", "finished", "id", [finished, todo_id], ()=>{
            cb();
        });
    },

    // delete the task
    delete : function(todo_id, cb){
        orm.delete("todos", "id", todo_id, ()=>{
            cb();
        });
    }
};

module.exports = todos;