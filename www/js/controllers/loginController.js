angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state', 'Users'];

function LoginCtrl($scope, $state, Users) {
    $scope.login = function(username, password) {
        
        Users.isUserRegistered(username,  function (isUserRegistered) {
            
            if (isUserRegistered) {
                Users.login(username, password, function (error, userData) {
                if (error) {
                    $scope.passwordError = "Error logging in:" + error;
                } else {
                    $scope.usernameError = "";
                    $scope.passwordError = "";
                    $scope.$apply();
                    $state.go('tab.chats');
                }
            });
            } else {
                $scope.usernameError = "Username not valid";
                $scope.$apply();
            }
        });
    };
    
    $scope.goRegisterPage = function() {
        $state.go('register');
    }
    
}