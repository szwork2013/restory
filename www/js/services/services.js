angular.module('socialCloud.services', [])

.factory('Chats', function () {
    var ref = new Firebase("https://restory.firebaseio.com/");
    var groupListRef = new Firebase("https://restory.firebaseio.com/groupsList");
    var savedGroupChat;
    var childCallBackRef;
    //put this function somewhere else?
    String.prototype.toCamelCase = function() {
    return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();        
        });
    };
    
    var addUserToGroupCallBack =  function(username, groupName, callback) { //check if permission denied or already part of group, 
        //Save group id in user data
        var messageGroupName = {};
        messageGroupName[groupName] = true;
        ref.child("users").child(username).child("groups").push(messageGroupName);

        //add username under group in group list
        var groupId = groupName.toCamelCase();
        var memberName = {};
        memberName[username] = true;
        ref.child("groupsList").child(groupId).child("members").push(memberName);
        callback();
    }

    return {
        getChats: function (callback) { //for now gets last 20 group chats in the system
            
            // Retrieve new posts as they are added to our database
            childCallBackRef = groupListRef.limitToLast(20).on("child_added", function(snapshot, prevChildKey) {
                var groupChats = snapshot.val();
                callback(groupChats);
            });
        },
        unregisterChatsEvent: function() {
            groupListRef.off('child_added', childCallBackRef);
        },
        
        createGroup: function(username, groupName) {
            var messageGroupName = {};
            messageGroupName[groupName] = true;
            ref.child("users").child(username).child("groups").push(messageGroupName);
            
            if(false) { //check if group name already exists
            
            } else {
                var groupId = groupName.toCamelCase();
                ref.child("groupsList").child(groupId).set({name: groupName});
                var usernameJson = {};
                usernameJson[username] = true;
                ref.child("groupsList").child(groupId).child("members").push(usernameJson);
            }
            
        },
        
        joinGroup: function(username, groupName, goChatDetailPage) {
            ref.child("users").child(username).child("groups").once("value", function(snapshot) {
                if(snapshot.val() == null) { //that means user has never joined any group yet
                    addUserToGroupCallBack(username, groupName, goChatDetailPage);
                    return;
                }
                var snapShotData = Object.keys(snapshot.val());
                var dataLength = snapShotData.length;
                var count = 1;
                snapshot.forEach(function(childSnapShot) {
                    var GroupNameJson = childSnapShot.val();
                    var groupIdKey = Object.keys(GroupNameJson)[0];
                    if ( groupIdKey.localeCompare(groupName) == 0 ) {
                        goChatDetailPage();
                        return true;
                    } else if(count == dataLength) {
                        addUserToGroupCallBack(username, groupName, goChatDetailPage);
                    }
                    count++;
                });
            });
        },
        
        removeGroup: function(groupName) {
            //check if has permission to remove group?
            //remove group or return no can do
        },
        setCurrentGroupChat: function(groupChat) {
            savedGroupChat = groupChat;
        },
        getCurrentGroupChat: function() {
            return savedGroupChat;
        }
    };
})
.factory('Resources', function() {
     var resources = [{
        id: 0,
        name: 'Addiction',
        numberOfResources: '14',
        icon: 'ion-coffee'
     }, {
        id: 1,
        name: 'Identity',
        numberOfResources: '1',
        icon: 'ion-ios-body'
  }, {
        id: 2,
        name: 'Mental Health',
        numberOfResources: '23',
        icon: 'ion-medkit'
  }, {
        id: 3,
        name: 'Relationships',
        numberOfResources: '9',
        icon: 'ion-ios-people'
  }, {
        id: 4,
        name: 'Sexuality',
        numberOfResources: '3',
        icon: 'ion-transgender'
  }, {
        id: 5,
        name: 'Self Management',
        numberOfResources: '8',
        icon: 'ion-arrow-graph-up-left'
  }];
    
    return {
        all: function () {
            return resources;
        },
        remove: function (resource) {
            resources.splice(resources.indexOf(resource), 1);
        },
        get: function (resourceId) {
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].id === parseInt(resourceId)) {
                    return resources[i];
                }
            }
            return null;
        }
    };
})
.factory('Messages', function() {
    var messagesRef = new Firebase("https://restory.firebaseio.com/messages/");
    var childCallBackRef;
    //put this function somewhere else?
    String.prototype.toCamelCase = function() {
        return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();        
        });
    };
    return {
        push: function(name, message, groupName) {
            messagesRef.child(groupName.toCamelCase()).push({name: name, text: message});
        },
        
        isCallBackSet: function () {
            return isCallBackSet;
        },
        
        getMessage: function(callback, groupName) {
            // Gets the last 20 messages
            childCallBackRef = messagesRef.child(groupName.toCamelCase()).limitToLast(40).on('child_added', function (snapshot) {
                //GET DATA
                var data = snapshot.val();
                var username = data.name || "anonymous";
                var message = data.text;
                
                
                callback({name: username, message: message});
            });
        },
        
        unregisterMessageEvent: function(groupName) {
            messagesRef.child(groupName.toCamelCase()).off('child_added', childCallBackRef);
        }
    };
    
})
.factory('Users', function() {
    var ref = new Firebase("https://restory.firebaseio.com/");
    var savedUsername;
    var isNewUser = false;
    ref.onAuth(function(authData) {
        if (authData && isNewUser) {
            // save the user's profile into the database so we can list users,
            // use them in Security and Firebase Rules, and show profiles
            ref.child("users").child(authData.auth.data.username).set({
                uid: authData.uid,
                accountType: "client"
            });
        }
    });

    
    return {
        
        isUserRegistered: function(username, callback) {
            ref.child("users").once("value", function(snapshot) {
              callback(snapshot.child(username).exists());
            });
        },
        createUser: function(username, password, callback) {
            isNewUser = true;
        var tokenGenerator = new FirebaseTokenGenerator("yse1wKDkbHKsgiNNkbTZjRs70vsHCCfXSbybMlT0");
            var userData = {username: username, password: password, "accountType": "client"};
            var authToken = tokenGenerator.createToken({ "uid": "device.uuid", data: userData});

            ref.authWithCustomToken(authToken, function(error, userData) {
                savedUsername = userData.auth.data.username;
                callback(error, userData);  
            });
        },
        
        logOut: function() {
            ref.off();
            ref.unauth();
        },
        login: function(username, password, callback) { //check if correct password
            isNewUser = false;
            var tokenGenerator = new FirebaseTokenGenerator("yse1wKDkbHKsgiNNkbTZjRs70vsHCCfXSbybMlT0");
            var userData = {username: username, password: password, "accountType": "client"};
            var authToken = tokenGenerator.createToken({ "uid": "device.uuid", data: userData});

            ref.authWithCustomToken(authToken, function(error, userData) {
                savedUsername = userData.auth.data.username;
                callback(error, userData);  
            });
        },
        
        registerNewUser: function(isRegisterUser) {
            isNewUser = isRegisterUser;
        },
        
        getUsername: function() {
            return savedUsername;
        }
    };
    
});