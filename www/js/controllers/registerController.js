angular.module('socialCloud.controllers')

// Define controller
.controller('RegisterCtrl', RegisterCtrl);

// Inject dependencies
RegisterCtrl.$inject = ['$scope', '$state', 'Users'];

function RegisterCtrl($scope, $state, Users) {
    
    var validateInput = function (username, password, confirmPassword) {
        var isValid = true;
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
        //$scope.$apply();
        return isValid;
    };
    
        $scope.createUser = function(username, password, confirmPassword) {
            
            if (validateInput(username, password, confirmPassword)) {
                Users.isUserRegistered(username, function(isUserRegistered) {
                    if(!isUserRegistered) {
                        Users.createUser(username, password, function (error, userData) {
                            if (error) {
                                console.log("Error creating user:", error);
                            } else {
                                $state.go('tab.chats');
                            }
                        });
                    } else {
                        $scope.usernameError = "Username not available";
                        $scope.$apply();
                    }
                });
            }
        };
    
}