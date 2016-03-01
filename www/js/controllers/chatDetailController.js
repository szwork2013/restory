angular.module('socialCloud.controllers')

// Create controller
.controller('ChatDetailCtrl', ChatDetailCtrl);

// Inject dependencies
ChatDetailCtrl.$inject = ['$scope', '$stateParams', 'Chats'];

// Define controller
function ChatDetailCtrl($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
}