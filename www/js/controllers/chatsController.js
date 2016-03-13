angular.module('socialCloud.controllers')

// Create controller
.controller('ChatsCtrl', ChatsCtrl);

// Inject dependencies
ChatsCtrl.$inject = ['$scope', '$state', '$stateParams', 'Chats', 'Users'];

// Define controller
function ChatsCtrl($scope, $state, $stateParams, Chats, Users) {
    $scope.remove = function (chat) {
        Chats.removeGroup(chat);
    };
    
    $scope.createGroup =  function (groupName) {
        var name = groupName || "No name";
        Chats.createGroup(Users.getUsername(), name);
        $scope.newChatInputModel = '';
    }
    
    $scope.joinGroup = function(groupName) {
        Chats.joinGroup(Users.getUsername(), groupName);
        Chats.setCurrentGroupChat(groupName);
        $state.go('tab.chat-detail');
    }
    
    $scope.$on('$ionicView.beforeEnter', function() {
        var callback = function(data) {
            //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
            var groupChat = $("<a>");
            groupChat.text(data.name);
                groupChat.click(function() {
                    $scope.joinGroup($( this ).text());
                });
                groupChat.addClass("item");
            //ADD MESSAGE
            $scope.groupChatList = $('#groupChatList');
            $scope.groupChatList.append(groupChat);
            //$scope.messageList[0].scrollTop = messageList[0].scrollHeight;
        };
        Chats.getChats(callback);
    });
    
    $scope.$on('$ionicView.afterLeave', function() {
        Chats.unregisterChatsEvent();
    })
}