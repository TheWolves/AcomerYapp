
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


    // Crear un nuevo restaurante  basado en el formulario
    $scope.createUser = function() {


        var userData = {
            username: $scope.formData.username,
            nameRestaurant: $scope.formData.nameRestaurant,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Guarda los datos en la BD
        $http.post('/users', userData)
            .then(function (data) {

                // Una vez completado, borre el formulario (excepto la ubicación)
                $scope.formData.username = "";
                $scope.formData.services = "";
                $scope.formData.nameRestaurant = "";

                gservice.refresh($scope.formData.latitude, $scope.formData.longitude)

            })
            .catch(function (error,data) {
                console.log('Error: ' + data);
              });
    };
});
