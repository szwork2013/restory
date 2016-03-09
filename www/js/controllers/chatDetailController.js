angular.module('socialCloud.controllers')

// Create controller
.controller('ChatDetailCtrl', ChatDetailCtrl);

// Inject dependencies
ChatDetailCtrl.$inject = ['$scope', '$stateParams', 'Chats', 'Messages'];

// Define controller
function ChatDetailCtrl($scope, $stateParams, Chats, Messages) {
    $scope.chat = Chats.get($stateParams.chatId);
    
    $scope.submitMessage = function(name, message) {
        Messages.push(name, message);
        $scope.messageInputModel = '';
        $scope.$apply();
    }
    
    $scope.checkIfEnterKeyWasPressed = function($event, name, message){
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
           $scope.submitMessage(name, message); 
        }
    };
    
    $scope.$on('$ionicView.afterEnter', function(){
        var callback = function(data) {
        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        var messageElement = $("<li>");
        var nameElement = $("<strong></strong>");
        nameElement.text(data.name);
        messageElement.text(data.message).prepend(nameElement);
        
        //ADD MESSAGE
        $scope.messageList = $('#messageList');
        $scope.messageList.append(messageElement);
        //$scope.messageList[0].scrollTop = messageList[0].scrollHeight;
        $scope.$apply();
        
    };
    Messages.getMessage(callback);
    });
    
}