var users = require("../models/users.js");
var projects = require("../models/projects.js");
var users_projects = require("../models/users_projects.js");
var todos = require("../models/todos.js");
var bcrypt = require('bcryptjs');

module.exports = function(app){
    //initial page
    app.get("/", function(req, res){
        // include buttons: login, signup
        res.render("index");
    });

    //after user login, redirect page to user homepage
    app.post("/login", function(req, res){

    });

    //sign up page
    app.get("/signup", function(req, res){
        
    });

    // after signup, redirect page to initial page and let user login
    app.post("/signup", function(req, res){
        
    });

    //logout and alert user
    app.get("/logout", function(req, res){
        req.session.destroy(function(err){
            res.render('logout');
        });
    });

    //***Below this point, always check if user login, if not, redirect user to login page***

    //shows all projects that the user involves
    //shows create project button
    //shows delete project option for each project that the user created
    app.get("/home", function(req, res){

    });

    //shows a form of require info for creating new projects
    //ie, project name, add groupmates to project
    app.get("/createproject", function(req, res){

    });

    //get info after user submits new projects info
    app.post("/createproject", function(req, res){

    });    
    
    //delete all info associate to the project
    //alert them before complete this deletion
    app.post("/deleteproject", function(req, res){

    });

    //show project todo lists and groupmates
    //invite/delete groupmate option if the user is the creator
    //todo list: add/delete/assign to groupmate buttons
    app.get("/project/:projectid", function(req, res){

    });

    //invite existing user to the project
    app.post("/project/:projectid/invite", function(req, res){

    });

    //delete groupmate from the project
    app.post("/project/:projectid/deletegroupmate", function(req, res){

    });

    //add a task
    app.post("/todo/add", function(req, res){

    });

    //delete a task
    app.post("/todo/delete", function(req, res){

    });

    //assign a task to someone
    app.post("/todo/assignto", function(req, res){

    });
}