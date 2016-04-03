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
    
    var addUserToGroupCallBack =  function(username, groupName, callback) { //check if already part of group
        //Save group id in user data
        var messageGroupName = {};
        messageGroupName[groupName] = true;
        ref.child("users").child(username).child("groups").update(messageGroupName);

        //add username under group in group list
        var groupId = groupName.toCamelCase();
        var memberName = {};
        memberName[username] = true;
        ref.child("groupsList").child(groupId).child("members").update(memberName);
        callback();
    }

    return {
        getChats: function (callback) { //for now gets last 40 group chats in the system
            
            // Retrieve new posts as they are added to our database
            childCallBackRef = groupListRef.limitToLast(40).on("child_added", function(snapshot, prevChildKey) {
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
            ref.child("users").child(username).child("groups").update(messageGroupName);
            
            if(false) { //check if group name already exists
            
            } else {
                var groupId = groupName.toCamelCase();
                ref.child("groupsList").child(groupId).set({name: groupName});
                var usernameJson = {};
                usernameJson[username] = true;
                ref.child("groupsList").child(groupId).child("members").update(usernameJson);
            }
            
        },
        
        joinGroup: function(username, groupName, goChatDetailPage) {
            ref.child("users").child(username).child("groups").once("value", function(snapshot) {
                if(snapshot.val() != null && snapshot.child(groupName).exists()) { 
                    goChatDetailPage();
                } else { //that means user has never joined any group yet, add to chat
                    addUserToGroupCallBack(username, groupName, goChatDetailPage);
                }
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
    var resources;
    var ref = new Firebase("https://restory.firebaseio.com/");
    return {
        getSurveyQuestions: function (callback) {
            var childCallBackRef = ref.child("surveys").child("allQuestions").limitToLast(30).on("child_added", function(snapshot, prevChildKey) {
                callback(snapshot.val());
            });
            ref.off('child_added', childCallBackRef);
        },
        
        
        all: function (callback) {
            ref.child("learnContent").child("learnContentHierarchy").once("value", function(snapshot) {
                callback(snapshot.val());
            });
        },
            
        get: function (resourceId, callback) {
            ref.child("learnContent").child("learnContentDetailPages").child(resourceId.replace(/ /g, '')).once("value", function(snapshot) {
                return callback(snapshot.val());
            });
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
        
        getMessage: function(callback, groupName) {
            // Gets the last 40 messages
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
    var currentUser;
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
                currentUser = userData.auth.data;
                callback(error, userData);  
            });
        },
        
        logOut: function() {
            ref.off();
            ref.unauth();
        },
        
        updateStatus: function(status) {
            ref.child("users").child(currentUser.username).update({status: status});
        },
        
        updateMood: function(mood) {
            ref.child("users").child(currentUser.username).update({mood: mood});
        },
        
        updateLocation: function(location) {
            ref.child("users").child(currentUser.username).update({location: location});
        },
        
        login: function(username, password, callback) { //check if correct password
            isNewUser = false;
            var tokenGenerator = new FirebaseTokenGenerator("yse1wKDkbHKsgiNNkbTZjRs70vsHCCfXSbybMlT0");
            var userData = {username: username, password: password, accountType: "client"};
            var authToken = tokenGenerator.createToken({ uid: "device.uuid", data: userData});

            ref.authWithCustomToken(authToken, function(error, userData) {
                currentUser = userData.auth.data;
                
                //add user listener to update profile page on app side
                ref.child("users").child(currentUser.username).on('value', function(dataSnapshot) {
                    var data = dataSnapshot.val();
                    currentUser.status = data.status;
                    currentUser.mood = data.mood;
                    currentUser.location = data.location;
                });
                callback(error, userData);  
            });
        },
        
        getCurrentUser: function() {
            return currentUser;
        }
    };
    
});