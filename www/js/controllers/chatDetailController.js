angular.module('socialCloud.controllers')

// Create controller
.controller('ChatDetailCtrl', ChatDetailCtrl);

// Inject dependencies
ChatDetailCtrl.$inject = ['$scope', '$stateParams','$ionicScrollDelegate', '$ionicLoading', 'Chats', 'Messages', 'Users'];

// Define controller
function ChatDetailCtrl($scope, $stateParams, $ionicScrollDelegate, $ionicLoading, Chats, Messages, Users) {
    $scope.chatName = $stateParams.chatName;
    cordova.plugins.Keyboard.disableScroll(true);
    $ionicLoading.show({
            template: 'Loading messages...',
            duration: 800
    });
    
    $scope.submitMessage = function(message) {
        Messages.push(Users.getCurrentUser().username, message, Chats.getCurrentGroupChat());
        $scope.messageInputModel = '';
    }
    
    $scope.checkIfEnterKeyWasPressed = function($event, message) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
           $scope.submitMessage(message); 
        }
    };
    
    $scope.$on('$ionicView.loaded', function() {
        var callback = function(data) {
            //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
            var username = data.name || "anonymous";
            var messageText = data.message;
            var nameElement = $("<strong></strong>");
            nameElement.text(username + ": ");
            var messageElement = $("<li>");
            messageElement.text(messageText).prepend(nameElement);
            //ADD MESSAGE
            $scope.messageList = $('#messageList');
            $scope.messageList.append(messageElement);
            $ionicScrollDelegate.scrollBottom();
        };
        Messages.getMessage(callback, Chats.getCurrentGroupChat());        
    });
    
    $scope.$on('$ionicView.unloaded', function() {
        Messages.unregisterMessageEvent(Chats.getCurrentGroupChat());
    });
    
}