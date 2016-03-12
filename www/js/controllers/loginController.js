angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state', '$stateParams', 'Users'];

function LoginCtrl($scope, $state, $stateParams, Users) {
    Users.logOut();
    $scope.login = function(username, password) {
        Users.createUser(username, password, function (error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            $state.go('tab.chats');
        }
    })
    };
    
}