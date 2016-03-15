angular.module('socialCloud.controllers')

// Define controller
.controller('RegisterCtrl', RegisterCtrl);

// Inject dependencies
RegisterCtrl.$inject = ['$scope', '$state', 'Users'];

function RegisterCtrl($scope, $state, Users) {
    
    
    $scope.createUser = function(username, password) {
        Users.isUniqueUser(username, function(isUniqueUsername) {
            if(isUniqueUsername) {
                Users.createUser(username, password, function (error, userData) {
                    if (error) {
                        console.log("Error creating user:", error);
                    } else {
                        $state.go('tab.chats');
                    }
                });
            } else {
                //show error
            }
        })
        
    };
    
}