angular.module('socialCloud.controllers')

// Define controller
.controller('ProfileCtrl', ProfileCtrl);

// Inject dependencies
ProfileCtrl.$inject = ['$scope', '$state', 'Chats'];

// Define controller
function ProfileCtrl($scope, $state, Chats) {
    $scope.chat = Chats.get(1);
    $scope.logout = function () {
        $state.go('login');
    }
}