const express = require('express'),
cors = require('cors'),
app = express(),
path = require('path'),
//indexRoutes = require('./routes/index'),
restaurantesRoutes = require('./routes/restaurantes');


//settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//route
//app.use(indexRoutes);
app.use('/restaurantes',restaurantesRoutes);

//static files
app.use(express.static(path.join(__dirname, 'dist')));

//app.use(tasksRoutes);


app.listen(app.get('port'), () =>{
  console.log('server on port', app.get('port'));
});
