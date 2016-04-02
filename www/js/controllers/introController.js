angular.module('socialCloud.controllers')

// Define controller
.controller('IntroCtrl', IntroCtrl);

// Inject dependencies
IntroCtrl.$inject = ['$scope','$state', '$ionicLoading', '$ionicSlideBoxDelegate', '$ionicHistory', '$ionicNavBarDelegate'];

// Define controller
function IntroCtrl($scope, $state, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(false);
    $ionicLoading.hide();
    
    // Called to navigate to the main app
    $scope.startApp = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.chats');
    };
        $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
        $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
}