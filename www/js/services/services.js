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
});
