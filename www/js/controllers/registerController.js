angular.module('socialCloud.controllers')

// Define controller
.controller('RegisterCtrl', RegisterCtrl);

// Inject dependencies
RegisterCtrl.$inject = ['$scope', '$state','$ionicLoading', '$ionicHistory', 'Users'];

function RegisterCtrl($scope, $state, $ionicLoading, $ionicHistory, Users) {
    
    var validateInput = function (username, password, confirmPassword) {
        var isValid = true;
        if (username) {
            if (username.search("^[a-zA-Z0-9]*$")) {
                $scope.usernameError = "Username has invalid characters";
                isValid = false;
            } else {
                 $scope.usernameError = "";
            }
        } else {
            $scope.usernameError = "Enter username";
            isValid = false;
        }
        if (!password) {
                $scope.passwordError = "Enter password";
                isValid = false;
        } else {
            $scope.passwordError = "";
        }
        if (!confirmPassword) {
            $scope.confirmPasswordError = "Confirm password";
            isValid = false;
        } else {
            $scope.confirmPasswordError = "";
        }
        
        if (password.localeCompare(confirmPassword) != 0) {
            isValid = false;
            $scope.confirmPasswordError = "Passwords does not match";
            
        } else {
            $scope.confirmPasswordError = "";
        }
        return isValid;
    };
    
        $scope.createUser = function(username, password, confirmPassword) {
            
            if (validateInput(username, password, confirmPassword)) {
                Users.isUserRegistered(username, function(isUserRegistered) {
                    if(!isUserRegistered) {
                        Users.createUser(username.toLowerCase(), password, function (error, userData) {
                            if (error) {
                                console.log("Error creating user:", error);
                            } else {
                                $ionicLoading.show({
                                    template: 'Logging In...',
                                    duration: 800
                                });
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('terms-and-conditions');
                            }
                        });
                    } else {
                        $scope.usernameError = "Username not available";
                        $scope.$apply();
                    }
                });
            }
        };
    
    $scope.goToLoginPage = function () {
        $state.go('login');
    }
    
}