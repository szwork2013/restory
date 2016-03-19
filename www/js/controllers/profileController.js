angular.module('socialCloud.controllers')

// Define controller
.controller('ProfileCtrl', ProfileCtrl);

// Inject dependencies
ProfileCtrl.$inject = ['$scope', '$state', 'Chats', 'Users'];

// Define controller
function ProfileCtrl($scope, $state, Chats, Users) {
    $scope.User = Users.getCurrentUser();
    $scope.updateStatus = function (status) {
        Users.updateStatus(status);
    }
    
    $scope.updateMood = function (mood) {
        Users.updateMood(mood);
    }
    
    $scope.updateLocation = function (location) {
        Users.updateLocation(location);
    }
    
    $scope.logout = function () {
        Users.logOut();
        $state.go('login');
    }
}