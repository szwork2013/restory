angular.module('socialCloud.controllers')

// Create controller
.controller('ChatDetailCtrl', ChatDetailCtrl);

// Inject dependencies
ChatDetailCtrl.$inject = ['$scope', '$stateParams', 'Chats', 'Messages', 'Users'];

// Define controller
function ChatDetailCtrl($scope, $stateParams, Chats, Messages, Users) {
    $scope.submitMessage = function(message) {
        Messages.push(Users.getUsername(), message, Chats.getCurrentGroupChat());
        $scope.messageInputModel = '';
    }
    
    $scope.checkIfEnterKeyWasPressed = function($event, message) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
           $scope.submitMessage(message); 
        }
    };
    
    $scope.$on('$ionicView.beforeEnter', function() {
        
        
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
        //$scope.messageList[0].scrollTop = messageList[0].scrollHeight;
    };
    Messages.getMessage(callback, Chats.getCurrentGroupChat());        
    });
    
    $scope.$on('$ionicView.afterLeave', function() {
        Messages.unregisterMessageEvent(Chats.getCurrentGroupChat());
    });
    
}