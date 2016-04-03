angular.module('socialCloud.controllers')

// Define controller
.controller('TermsConditionsCtrl', TermsConditionsCtrl);

// Inject dependencies
TermsConditionsCtrl.$inject = ['$scope','$state', '$ionicLoading', '$ionicNavBarDelegate'];

// Define controller
function TermsConditionsCtrl($scope, $state, $ionicLoading, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(false);
    $ionicLoading.hide();
    
    $scope.disagree = function() {
        $ionicNavBarDelegate.back();
    }
    
    $scope.gotoIntro = function() {
        $state.go('intro');
    }
}