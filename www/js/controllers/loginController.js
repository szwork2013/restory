angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state','$ionicLoading', 'Users'];

function LoginCtrl($scope, $state, $ionicLoading, Users) {
    
    $scope.login = function(username, password) {
        
        Users.isUserRegistered(username.toLowerCase(),  function (isUserRegistered) {
            
            if (isUserRegistered) {
                Users.login(username.toLowerCase(), password, function (error, userData) {
                    if (error) {
                        $scope.passwordError = "Error logging in:" + error;
                    } else {
                        $ionicLoading.show({
                                template: 'Logging In...',
                                duration: 800
                        });
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