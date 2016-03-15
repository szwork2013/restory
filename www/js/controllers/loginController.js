angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state', 'Users'];

function LoginCtrl($scope, $state, Users) {
    $scope.login = function(username, password) {
        Users.login(username, password, function (error, userData) {
        if (error) {
            console.log("Error logging in:", error);
        } else {
            $state.go('tab.chats');
        }
    })
    };
    
    $scope.goRegisterPage = function() {
        $state.go('register');
    }
    
}