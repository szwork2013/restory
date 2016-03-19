angular.module('socialCloud.controllers')

// Define controller
.controller('ProfileCtrl', ProfileCtrl);

// Inject dependencies
ProfileCtrl.$inject = ['$scope', '$state', 'Chats', 'Users'];

// Define controller
function ProfileCtrl($scope, $state, Chats, Users) {
    $scope.User = Users.getCurrentUser();
    $scope.updateStatus = function (status) {
        if (status) {
           Users.updateStatus(status); 
        } else {
            Users.updateStatus(""); 
        }
    }
    
    $scope.updateMood = function (mood) {
        if (mood) {
           Users.updateMood(mood); 
        } else {
            Users.updateMood(""); 
        }
    }
    
    $scope.updateLocation = function (location) {
        if (location) {
            Users.updateLocation(location);
        } else {
            Users.updateLocation(""); 
        }
    }
    
    $scope.logout = function () {
        Users.logOut();
        $state.go('login');
    }
    
     $scope.$on('$ionicView.loaded', function() {
        $scope.statusModel = $scope.User.status;
        $scope.moodModel = $scope.User.mood;
        $scope.locationModel = $scope.User.location;
    });
    
    $scope.$on('$ionicView.beforeLeave', function() {
        Users.updateStatus($scope.statusModel);
        Users.updateMood($scope.moodModel);
        Users.updateLocation($scope.locationModel);
    });
}