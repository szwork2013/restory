angular.module('socialCloud.controllers')

// Define controller
.controller('ProfileCtrl', ProfileCtrl);

// Inject dependencies
ProfileCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'Chats', 'Users'];

// Define controller
function ProfileCtrl($scope, $state, $ionicPopup, Chats, Users) {
    $scope.User = Users.getCurrentUser();
     // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="list"><label class="item item-input item-select"><div class="input-label">Mood</div><select><option>Alhamdulilah</option><option selected>Happy</option><option>OK</option><option>Sad</option><option>Angry</option></select></label><label class="item item-input item-select"><div class="input-label">Health</div><select><option>5 (Blessed)</option><option selected>4 (Good)</option><option>3 (Average)</option><option>2 (poor)</option><option>1 (Critical)</option></select></label></div>',
            title: "How are you " + $scope.User.username + "?",
            subTitle: 'Update yourself',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  //save data
                }
              }
            ]
        }); 
        myPopup.then(function(res) {
            //save data
        });
    
    $scope.updateStatus = function (status) {
        if (status) {
           Users.updateStatus(status); 
        } else {
            Users.updateStatus(""); 
        }
    }
    
    $scope.updateMood = function (mood) {
        if (mood) {
           Users.updateMood(mood); 
        } else {
            Users.updateMood(""); 
        }
    }
    
    $scope.updateLocation = function (location) {
        if (location) {
            Users.updateLocation(location);
        } else {
            Users.updateLocation(""); 
        }
    }
    
    $scope.showMoodChart = function () {
        $state.go('tab.profile-mood-chart');
    }
    
    $scope.logout = function () {
        Users.logOut();
        $state.go('login');
    }
    
     $scope.$on('$ionicView.loaded', function() {
        $scope.statusModel = $scope.User.status;
        $scope.moodModel = $scope.User.mood;
        $scope.locationModel = $scope.User.location;
    });
    
    $scope.$on('$ionicView.beforeLeave', function() {
        Users.updateStatus($scope.statusModel);
        Users.updateMood($scope.moodModel);
        Users.updateLocation($scope.locationModel);
    });
}