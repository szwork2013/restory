angular.module('socialCloud.controllers')

// Create controller
.controller('LearnCtrl', LearnCtrl);

// Inject dependencies
LearnCtrl.$inject = ['$scope', 'Resources'];

// Define controller
function LearnCtrl($scope, Resources) {
    $scope.resources = Resources.all();
    $scope.remove = function (resource) {
        Resources.remove(resource);
    };
    
    $scope.resources = Resources.all();
    
    
    
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