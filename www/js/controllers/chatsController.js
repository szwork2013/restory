angular.module('socialCloud.controllers')

// Create controller
.controller('ChatsCtrl', ChatsCtrl);

// Inject dependencies
ChatsCtrl.$inject = ['$scope', '$state', '$stateParams','$ionicLoading', '$ionicScrollDelegate', '$ionicHistory', '$ionicNavBarDelegate', 'Chats', 'Users'];

// Define controller
function ChatsCtrl($scope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicHistory, $ionicNavBarDelegate, Chats, Users) {
    $ionicNavBarDelegate.showBackButton(false);
    $ionicLoading.hide();
    //cordova.plugins.Keyboard.disableScroll(true);
    
    $scope.remove = function (chat) {
        Chats.removeGroup(chat);
    };
    
    $scope.createGroup =  function (groupName) {
        var name = groupName || "No name";
        Chats.createGroup(Users.getCurrentUser().username, name);
        $scope.newChatInputModel = '';
        $ionicScrollDelegate.scrollBottom();
    }
    
    $scope.joinGroup = function(groupName) {
        var goChatDetailPage = function() {
            $state.go('tab.chat-detail', {chatName:groupName});
        }
        Chats.setCurrentGroupChat(groupName);
        Chats.joinGroup(Users.getCurrentUser().username, groupName, goChatDetailPage);   
    }
    
    $scope.$on('$ionicView.loaded', function() {    
        
        var callback = function(data) {
            
            if (data) {
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
            }
            $ionicLoading.hide(); //will be called too many times. not good.
        };
        $ionicLoading.show({template: 'Loading chats...'});
        Chats.getChats(callback);
    });
    
    $scope.$on('$ionicView.unloaded', function() {
        Chats.unregisterChatsEvent();
    });
    
}