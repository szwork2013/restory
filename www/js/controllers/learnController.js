angular.module('socialCloud.controllers')

// Create controller
.controller('LearnCtrl', LearnCtrl);

// Inject dependencies
LearnCtrl.$inject = ['$scope', 'Resources'];

// Define controller
function LearnCtrl($scope, Resources) {
    $scope.resources = Resources.all();
    $scope.remove = function (resource) {
        Resources.remove(resource);
    };
}