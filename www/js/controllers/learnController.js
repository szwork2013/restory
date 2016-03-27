angular.module('socialCloud.controllers')

// Create controller
.controller('LearnCtrl', LearnCtrl);

// Inject dependencies
LearnCtrl.$inject = ['$scope','$ionicLoading', 'Resources'];

// Define controller
function LearnCtrl($scope, $ionicLoading, Resources) {
    $ionicLoading.show({template: 'Logging Resources...'});
    
    var getResourcesCallback = function(resources) {
        $scope.resources = resources;
        $ionicLoading.hide();
    }
    
    Resources.all(getResourcesCallback);
     /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    
    $scope.toggleSubGroup = function(group) {
    if ($scope.isSubGroupShown(group)) {
      $scope.shownSubGroup = null;
    } else {
      $scope.shownSubGroup = group;
    }
  };
  $scope.isSubGroupShown = function(group) {
    return $scope.shownSubGroup === group;
  };
    
}