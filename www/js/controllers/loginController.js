angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state','$ionicLoading', '$ionicHistory', 'Users'];

function LoginCtrl($scope, $state, $ionicLoading, $ionicHistory, Users) {
    
    $scope.login = function(username, password) {
        
        Users.isUserRegistered(username.toLowerCase(),  function (isUserRegistered) {
            
            if (isUserRegistered) {
                Users.login(username.toLowerCase(), password, function (error, userData) {
                    if (error) {
                        $scope.passwordError = "Error logging in:" + error;
                    } else {
                        $ionicLoading.show({template: 'Logging In...'});
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        //have logic here to see if first time user
                        //$state.go('tab.chats');
                        $state.go('intro');
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