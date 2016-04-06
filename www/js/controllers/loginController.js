angular.module('socialCloud.controllers')

// Define controller
.controller('LoginCtrl', LoginCtrl);

// Inject dependencies
LoginCtrl.$inject = ['$scope', '$state','$ionicLoading', '$ionicHistory', '$ionicPopup', 'Users'];

function LoginCtrl($scope, $state, $ionicLoading, $ionicHistory, $ionicPopup, Users) {
    
    if (false) {//if new user
    
        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/welcome-pop-up.html',
            title: "How are you?",
            subTitle: 'Update yourself',
            scope: $scope,
            buttons: [
              { text: 'Login',
                type: 'button-positive'
              },
              {
                text: '<b>Sign up</b>',
                type: 'button-balanced',
                onTap: function(e) {
                  $state.go('register');
                }
              }
            ]
        }); 
        myPopup.then(function(res) {
            
        });
    }
    
    $scope.login = function(username, password) {
        
        Users.isUserRegistered(username.toLowerCase(),  function (isUserRegistered) {
            
            if (isUserRegistered) {
                Users.login(username.toLowerCase(), password, function (error, userData) {
                    if (error) {
                        $scope.passwordError = "Error logging in:" + error;
                    } else {
                        $ionicLoading.show({template: 'Logging In...'});
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        
                        if(true) { //check if user accepted T&Cs
                            $state.go('tab.chats');
                        } else {
                            $state.go('terms-and-conditions');
                        }
                        
                    }
                });
            } else {
                $scope.usernameError = "Username not valid";
                $scope.$apply();
            }
        });
    };
    
    $scope.goRegisterPage = function() {
        $state.go('register');
    }
    
    
}