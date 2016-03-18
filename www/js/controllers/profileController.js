angular.module('socialCloud.controllers')

// Define controller
.controller('ProfileCtrl', ProfileCtrl);

// Inject dependencies
ProfileCtrl.$inject = ['$scope', '$state', 'Chats', 'Users'];

// Define controller
function ProfileCtrl($scope, $state, Chats, Users) {
    $scope.User = Users.getCurrentUser();
    $scope.logout = function () {
        Users.logOut();
        $state.go('login');
    }
}