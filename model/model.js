const mongoose    = require('mongoose'),
Schema      = mongoose.Schema;

// Creacion de un  User Schema.
var UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    nameRestaurant: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Establece el parámetro created_at igual a la hora actual
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

//Indexes este esquema en formato 2dsphere (fundamental para ejecutar búsquedas de proximidad)
 UserSchema.index({location: '2dsphere'});


 // Exporta el UserSchema para usar en otro lugar. Establece la colección MongoDB para ser utilizada como: "scotch-users"
 module.exports = mongoose.model('restaurants', UserSchema);
