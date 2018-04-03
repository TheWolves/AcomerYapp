
// Crea el Módulo addCtrl y el Controlador. Tenga en cuenta que depende del módulo y servicio de 'geolocalización'.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);

addCtrl.controller('addCtrl', function($scope, $http, geolocation,  gservice){

    // Inicializar Variables
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Establece las coordenadas iniciales
    $scope.formData.latitude = 4.6859019;
    $scope.formData.longitude = -74.11131820000003;

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};

    // Display coordinates in location textboxes rounded to three decimal points
    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

    // Display message confirming that the coordinates verified.
    $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});


    // Crear un nuevo restaurante  basado en el formulario
    $scope.createUser = function() {


        var userData = {
            username: $scope.formData.username,
            email: $scope.formData.email,
            password: $scope.formData.password,
            nameRestaurant: $scope.formData.nameRestaurant,
            location: [parseFloat($scope.formData.longitude), parseFloat($scope.formData.latitude)],
            htmlverified: $scope.formData.htmlverified
        };

        // Guarda los datos en la BD
        $http.post('/users', userData)
            .then(function (data) {

                // Una vez completado, borre el formulario (excepto la ubicación)
                $scope.formData.username = "";
                $scope.formData.email = "";
                $scope.formData.password = "";
                $scope.formData.nameRestaurant = "";

                gservice.refresh($scope.formData.latitude, $scope.formData.longitude)

            })
            .catch(function (error,data) {
                console.log('Error: ' + data);
              });
    };
});
