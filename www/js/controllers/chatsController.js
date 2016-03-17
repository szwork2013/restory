angular.module('socialCloud.controllers')

// Create controller
.controller('ChatsCtrl', ChatsCtrl);

// Inject dependencies
ChatsCtrl.$inject = ['$scope', '$state', '$stateParams', '$ionicScrollDelegate', 'Chats', 'Users'];

// Define controller
function ChatsCtrl($scope, $state, $stateParams, $ionicScrollDelegate, Chats, Users) {
    $scope.remove = function (chat) {
        Chats.removeGroup(chat);
    };
    
    $scope.createGroup =  function (groupName) {
        var name = groupName || "No name";
        Chats.createGroup(Users.getUsername(), name);
        $scope.newChatInputModel = '';
        $ionicScrollDelegate.scrollBottom();
    }
    
    $scope.joinGroup = function(groupName) {
        var goChatDetailPage = function() {
            $state.go('tab.chat-detail', {chatName:groupName});
        }
        Chats.joinGroup(Users.getUsername(), groupName, goChatDetailPage);
        Chats.setCurrentGroupChat(groupName);
    }
    
    $scope.$on('$ionicView.loaded', function() {
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
            $ionicScrollDelegate.resize();
        };
        Chats.getChats(callback);
    });
    
    $scope.$on('$ionicView.unloaded', function() {
        Chats.unregisterChatsEvent();
    });
    
}