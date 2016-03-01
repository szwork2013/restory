angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state'];

// Now create our controller function with all necessary logic
function LoginCtrl($scope, $state) {
    // Logic here
    $scope.login = function () {
        $state.go('tab.chats');
    }
}