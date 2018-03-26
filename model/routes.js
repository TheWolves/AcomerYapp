// Dependencias
var mongoose        = require('mongoose');
var User            = require('./model.js');

module.exports = function(app) {

    // GET Rutas
    // --------------------------------------------------------

// Abre rutas de la aplicación
// Recuperar registros para todos los usuarios en el archivo db
    app.get('/users', function(req, res){

        // Usa el esquema de Mongoose para ejecutar la búsqueda (condiciones de vacío)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);


    // Si no se encuentran errores, responde con un JSON de todos los usuarios
            res.json(users);
        });
    });

    // POST Rutas
    // --------------------------------------------------------
    // Proporciona un método para guardar nuevos usuarios en el archivo db
    app.post('/users', function(req, res){

        // Crea un nuevo usuario basado en el esquema de Mongoose y el cuerpo de la publicación
        var newuser = new User(req.body);

        // Nuevo usuario registrado en la DB
        newuser.save(function(err){
            if(err)
                res.send(err);

            // Si no se encuentran errores, responde con un JSON del nuevo usuario
            res.json(req.body);
        });
    });
};
