angular.module('socialCloud.services', [])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
  }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
  }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
  }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
  }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
  }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
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
        icon: 'ion-arrow-graph-up-left'}];
    
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
    
    return {
        push: function(name, message) {
            messagesRef.push({name: name, text: message});
        },   
        
        getMessage: function(callback) {
            // Gets the last 10 messages
            messagesRef.limitToLast(10).on('child_added', function (snapshot) {
                //GET DATA
                var data = snapshot.val();
                var username = data.name || "anonymous";
                var message = data.text;
                callback({name: username, message: message});
            });
        }
    };
    
})
.factory('Users', function() {
    var ref = new Firebase("https://restory.firebaseio.com/");
    var savedUsername;
    var isNewUser = true; //set this to false after testing
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
        createUser: function(username, password, callback) { //where to add username unique logic?
            
        var tokenGenerator = new FirebaseTokenGenerator("yse1wKDkbHKsgiNNkbTZjRs70vsHCCfXSbybMlT0");
            var userData = {username: username, password: password, "isModerator": true};
            var authToken = tokenGenerator.createToken({ "uid": device.uuid, data: userData});

            ref.authWithCustomToken(authToken, function(error, userData) {
                savedUsername = userData.auth.data.username;
                callback(error, userData);  
            });
        },
        
        logOut: function() {
            ref.unauth();
        },
        
        registerNewUser: function(isRegisterUser) {
            isNewUser = isRegisterUser;
        },
        
        getUsername: function() {
            return savedUsername;
        }
    };
    
});
