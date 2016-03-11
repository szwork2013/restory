angular.module('socialCloud.controllers')

// Define controller
.controller('ProfileCtrl', ProfileCtrl);

// Inject dependencies
ProfileCtrl.$inject = ['$scope', '$state', 'Chats', 'Users'];

// Define controller
function ProfileCtrl($scope, $state, Chats, Users) {
    $scope.chat = Chats.get(1);
    $scope.logout = function () {
        Users.logOut();
        $state.go('login');
    }
}