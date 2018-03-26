// Dependencias
// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

// Express Configuracion
// -----------------------------------------------------

// Establece la conexión a MongoDB
mongoose.connect("mongodb://Jason25Dev:123456789@ds117759.mlab.com:17759/acomeryapp");

// Logging and Parsing
app.use(express.static(__dirname + '/maps'));                // establece la ubicación de los archivos estáticos en público
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));                                         // log con Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // permite a bodyParser ver el texto sin formato
app.use(bodyParser.json({ type: 'application/vnd.api+json'})); // aplicación parse / vnd.api + json como json
app.use(methodOverride());

// Rutas
// ------------------------------------------------------
 require('./model/routes.js')(app);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
