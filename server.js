// load the things we need
var express = require('express');
var app = express();
app.use( express.static( "public" ) );


app.set('view engine', 'ejs');

app.get('/', function(req, res){

		  
    res.render('../views/pages/index.ejs');
  
})


	app.get('/login', function(req, res){

		  
		  res.render('../views/pages/login.ejs');
		
    })
    
    
	app.get('/signup', function(req, res){

		  
        res.render('../views/pages/signup.ejs');
      
  })


  app.get('/home', function(req, res){

		  
    res.render('../views/pages/home.ejs');
  
})

app.get('/detail', function(req, res){

		  
    res.render('../views/pages/detail.ejs');
  
})

app.get('/create', function(req, res){

		  
    res.render('../views/pages/create.ejs');
  
})


	

app.listen(3000, function(){
	console.log('listening on 3000')
});