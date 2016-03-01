angular.module('socialCloud.controllers')

// Create controller
.controller('LearnCtrl', LearnCtrl);

// Inject dependencies
LearnCtrl.$inject = ['$scope'];

// Define controller
function LearnCtrl($scope) {
    $scope.settings = {
        enableFriends: true
    };
}