angular.module('socialCloud.controllers')

// Create controller
.controller('LearnCtrl', LearnCtrl);

// Inject dependencies
LearnCtrl.$inject = ['$scope','$state', '$stateParams', '$ionicLoading', 'Resources'];

// Define controller
function LearnCtrl($scope, $state, $stateParams, $ionicLoading, Resources) {
    $ionicLoading.show({template: 'Loading Resources...'});

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
        
        if (group.subheadings) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        } else {
            $scope.goto(group.name);
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

    $scope.toggleSubGroup = function(group) {
        
        if (group.subsubheadings) {
            if ($scope.isSubGroupShown(group)) {
                $scope.shownSubGroup = null;
            } else {
                $scope.shownSubGroup = group;
            }
        } else {
            $scope.goto(group.name); 
        }
    };
    
    $scope.isSubGroupShown = function(group) {
        return $scope.shownSubGroup === group;
    };
    
    $scope.goto = function(contentPageName) {
        $state.go('tab.learn-detail', {contentpage:contentPageName});
    };
    
}