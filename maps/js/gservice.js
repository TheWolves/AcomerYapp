
// Crea la fábrica gservice. Este será el medio principal por el que interactuamos con Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){


        var googleMapService = {};
        // Handling Clicks and location selection
        googleMapService.clickLat  = 0;
        googleMapService.clickLong = 0;


        // Matriz de ubicaciones obtenidas de llamadas API
        var locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 4.6859019;
        var selectedLong = -74.11131820000003;

        // Funciones
        // --------------------------------------------------------------

// Actualizar el mapa con nuevos datos. La función tomará nuevas coordenadas de latitud y longitud.
        googleMapService.refresh = function(latitude, longitude){

            // Borra la matriz de ubicaciones de espera.
            locations = [];


// Establece el lat seleccionado y el largo igual a los proporcionados en la llamada de actualización ()
            selectedLat = latitude;
            selectedLong = longitude;


// Realiza una llamada AJAX para obtener todos los registros en el db.
            $http.get('/users').then(function(response){


     // Convierte los resultados en Google Map Format

                locations = convertToMapPoints(response);

                // Entonces inicializa el mapa.
                initialize(parseFloat(latitude), parseFloat(longitude));
            }).catch(function(error){
              console.log('Error: ' + data);
            });
        };


        // Convertir un JSON de usuarios en puntos de mapa
        var convertToMapPoints = function(response){


// Borrar el titular de las ubicaciones
            var locations = [];


  // Loop a través de todas las entradas JSON proporcionadas en la respuesta
            for(var i= 0; i < response.length; i++) {
                var user = response[i];


// Crear ventanas emergentes para cada registro
                var  contentString =
                    '<p><b>Username</b>: ' + user.username +
                    '<br><b>nameRestaurant</b>: ' + user.nameRestaurant +
                    '</p>';

                // Convierte cada uno de los registros JSON en formato de ubicación de Google Maps (Nota [Lat, Lng] formato.
                locations.push({
                    latlon: new google.maps.LatLng(parseFloat(user.location[1]), parseFloat(user.location[0])),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: user.username,
                    nameRestaurant: user.nameRestaurant,
            });
        }
        // la ubicación ahora es una matriz poblada con registros en formato Google Maps
        return locations;
    };

// Inicializa el mapa
var initialize = function(latitude, longitude) {


// Utiliza el lat seleccionado, siempre como punto de inicio
    var myLatLng ={lat:parseFloat(selectedLat), lng:parseFloat(selectedLong)};


// Si el mapa no se ha creado
    if (!map){


// Crear un nuevo mapa y colocarlo en la página index.html
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: myLatLng
        });
    }


    locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });


// Para cada marcador creado, agregue un oyente que compruebe si hay clics
        google.maps.event.addListener(marker, 'click', function(e){


// Cuando se hace clic, abre el mensaje del marcador seleccionado
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });


// Establecer la ubicación inicial como un marcador rojo que rebota
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

};




// Actualiza la página al cargar la ventana. Usa la latitud y la longitud iniciales
google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;
});
