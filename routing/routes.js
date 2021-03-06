var connection = require("../config/connection.js");
var users = require("../models/users.js");
var projects = require("../models/projects.js");
var users_projects = require("../models/users_projects.js");
var todos = require("../models/todos.js");
var bcrypt = require('bcryptjs');

//session stuff
var cookieParser = require('cookie-parser');

var session = require('express-session');

module.exports = function(app){
    //allow sessions
    app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365 }}));

    app.use(cookieParser());

    //initial page
    app.get("/", function(req, res){
        // include buttons: login, signup
        res.render("pages/index");
    });

    app.get("/login", function(req, res){
        res.render("pages/login");
    });

    //after user login, redirect page to user homepage
    app.post("/login", function(req, res){
        //res.render("pages/login");
        //console.log(req.body);//{ email: 'huwu@gmail.com', password: 'yyyyy' }
        users.selectUser(req.body.email, (results)=>{
            //console.log(results);
            if (results.length == 0){
                res.send(403, {
                    error: "User not found."
                });
            }
            else{
                bcrypt.compare(req.body.password, results[0].password_hash, function(err, result){
                    if(result){
                        req.session.user_id = results[0].id;
                        req.session.email = results[0].email;
                        req.session.username = results[0].name;
                        //send to user  homepage
                        res.send(`/${req.session.user_id}/home`);
                    }
                    else{
                        res.send(403, {
                            error: "Password does not match."
                        });
                    }
                });
            }
        });
        //res.redirect("/home");
    });

    //sign up page
    app.get("/signup", function(req, res){
        res.render("pages/signup");
    });

    // after signup, redirect page to initial page and let user login
    app.post("/signup", function(req, res){

        bcrypt.genSalt(10, function(err, salt){
            //res.send(salt);
            bcrypt.hash(req.body.password, salt, function(err, p_hash) { 

                //res.send(p_hash);

                users.insert(req.body.username, req.body.email, p_hash, (err, result)=>{
                    //console.log(err);
                    if(err){
                        res.send(403, {
                            error: err
                        });
                    }
                    else{
                        res.send(true);
                    }
                });
            });
        });

    });

    //logout and alert user
    app.get("/logout", function(req, res){
        req.session.destroy(function(err){
            res.render('pages/logout');
        });
    });

    //***Below this point, always check if user login, if not, redirect user to login page***

    //shows all projects that the user involves
    //shows create project button
    //shows delete project option for each project that the user created
    app.get("/:userid/home", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        };
        //console.log(user_info);

        if(user_info.user_id === undefined || 
            user_info.user_id != req.params.userid) res.redirect("/login");
        else{
            var username= req.session.username;
            var homelink = `/${user_info.user_id}/home`;
            var userid = user_info.user_id;
            connection.query(`SELECT p.id, p.name, p.project_description, u.name as creator FROM projects p RIGHT JOIN users_projects i ON i.project_id = p.id RIGHT JOIN users u ON u.id = p.creator_id WHERE i.user_id = ${user_info.user_id}`, 
            (error, results, fields)=>{
                if (error) return console.log(error);

                //console.log(results[0].name);
                var projects = results;
                //console.log(projects)
                projects.currentUser = username;

                res.render("pages/home", {username, homelink, userid, projects});
            });
        }
    });

    //shows a form of require info for creating new projects
    //ie, project name, add groupmates to project
    app.get("/:userid/createproject", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        };

        if(user_info.user_id === undefined || 
            user_info.user_id != req.params.userid) res.redirect("/login");
        else{
            //console.log("createproject", user_info);
            var username= req.session.username;
            var homelink = `/${user_info.user_id}/home`;
            var userid = user_info.user_id;
            res.render("pages/create",{
                username, 
                homelink,
                userid
            });
        }
    });

    //get info after user submits new projects info
    app.post("/:userid/createproject", function(req, res){

        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        }

        if(user_info.user_id === undefined || 
            user_info.user_id != req.params.userid) res.redirect("/login");
        else{
            var projectName = req.body.projectName.trim();
            var projectDescription = req.body.projectDescription.trim();
            //console.log(projectName, projectDescription);
            if (projectDescription === "")  projectDescription = null;

            projects.insert(projectName, projectDescription, user_info.user_id, (err, result)=>{
                //console.log(result[0]['LAST_INSERT_ID()']);
                users_projects.insert(user_info.user_id, result[0]['LAST_INSERT_ID()'], (err, result)=>{
                    res.redirect(`/${user_info.user_id}/home`);
                });
            });
        }
    });    
    
    //delete all info associate to the project
    //alert them before complete this deletion
    app.post("/deleteproject", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        }
        if(user_info.user_id === undefined) res.redirect("/login");
        else{
            //console.log(req.body.projectID);
            projects.delete(req.body.projectID, ()=>{
                res.send(true);
            });
        }
    });

    // rename project name
    app.post("/renameproject", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        }
        if(user_info.user_id === undefined) res.redirect("/login");
        else{
            //console.log(req.body.projectID);
            projects.rename(req.body.projectID, req.body.newName,()=>{
                res.send(true);
            });
        }
    });

    //edit project description
    app.post("/editprojectdescription", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        }
        if(user_info.user_id === undefined) res.redirect("/login");
        else{
            //console.log(req.body.projectID);
            projects.editDescription(req.body.projectID, req.body.newDescription,()=>{
                res.send(true);
            });
        }
    });

    //show project todo lists and groupmates
    //invite/delete groupmate option if the user is the creator
    //todo list: add/delete/assign to groupmate buttons
    app.get("/:projectid/project", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        }
        if(user_info.user_id === undefined) res.redirect("/login");
        else{
            var username = req.session.username;
            var homelink = `/${user_info.user_id}/home`;
            var projectid = req.params.projectid;
            projects.getProjectName(req.params.projectid, (results)=>{
                var projectName = results[0].name;
                var projectCreator = results[0].creator_id;
                var userid = user_info.user_id;
                //users_projects.selectUsers(projectid, (results))
                connection.query(`SELECT i.user_id, u.name FROM users_projects i RIGHT JOIN users u ON i.user_id = u.id WHERE i.project_id = ${projectid}`,
                (error, results, fields)=>{
                    var groupmates = results;
                    //console.log(results[0]);
                    res.render("pages/detail", {
                        username,
                        homelink,
                        projectName,
                        projectid,
                        projectCreator,
                        userid,
                        groupmates
                    });
                });
            });
            
        }
    });

    //invite existing user to the project
    app.post("/:projectid/invite", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        }
        if(user_info.user_id === undefined) res.redirect("/login");
        else{
            var userEmail = req.body.newGroupmateEmail;
            var projectid = req.params.projectid;
            //console.log("projectid", projectid);

            users.selectUser(userEmail, (results)=>{
                if(results.length === 0){
                    res.send(403, {
                        error: `Cannot find user ${userEmail}, please try again.`
                    });
                }
                else{
                    var userid = results[0].id;
                    var username = results[0].name;
                    if (user_info.user_id === userid){
                        res.send(403, {
                            error: "You are already in this group."
                        });
                    }

                    connection.query(`SELECT user_id, project_id FROM users_projects WHERE user_id = ${userid} AND project_id = ${projectid}`, 
                    (error, results, fields)=>{
                        console.log(results);
                        if(results.length > 0){
                            res.send(403, {
                                error: "This user is already added in this group."
                            });
                        }
                        else{
                            users_projects.insert(userid, projectid, (err, result)=>{
                                //console.log(err);
                                //console.log(result);
                                res.send({
                                    userid,
                                    username
                                });
                            });
                        }
                        
                    });
                }
            });
        }
    });

    //delete groupmate from the project
    app.post("/:projectid/:groupmateid/deletegroupmate", function(req, res){
        var user_info = {
            user_id : req.session.user_id,
            email: req.session.email
        }
        if(user_info.user_id === undefined) res.redirect("/login");
        else{
            users_projects.removeUser(req.params.projectid, req.params.groupmateid, ()=>{
                res.send(true);
            });
        }

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