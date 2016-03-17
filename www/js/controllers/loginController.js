angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state','$ionicLoading', 'Users'];

function LoginCtrl($scope, $state, $ionicLoading, Users) {
    
   /* var clearData = function() {
        $scope.usernameError = "";
        $scope.passwordError = "";
        $scope.usernameModel = "";
        $scope.passwordModel = "";
        $scope.$apply();
    }*/
    
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
                        $scope.usernameError = "";
                        $scope.passwordError = "";
                        $scope.usernameModel = "";
                        $scope.passwordModel = "";
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
        $scope.usernameError = "";
        $scope.passwordError = "";
        $scope.usernameModel = "";
        $scope.passwordModel = "";
        $state.go('register');
    }
    
    
    
    
}