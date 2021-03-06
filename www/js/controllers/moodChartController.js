angular.module('socialCloud.controllers')


// Create controller
.controller('MoodChartCtrl', MoodChartCtrl);

// Inject dependencies
MoodChartCtrl.$inject = ['$scope'];

// Define controller
function MoodChartCtrl($scope) {
    $scope.graph = {};

    $scope.graph.data = [
        //Mood
        [4, 3, 0, 2, 2, 5, 0],
        //Health
        [3, 3, 1, 3, 3, 5, 4]
    ];
    $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    $scope.graph.series = ['Mood', 'Health'];
    $scope.graph.colors = ['#00AAFF', '#46BFBD'];
};
