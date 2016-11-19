/* ----- Replace Username String With Treehouse Username ----- */
var username = 'joshdunn';

angular.module('treehouseAchievementWidget', [])
.controller('mainCtrl', function($scope, $http) {
  $scope.$emit('load');
  /* ----- Gets Treehouse API ----- */
  $http.get('https://teamtreehouse.com/' + username + '.json').success(function(data) {

    $scope.profile = data;

    /* ----- Reverses Points Sort Order & Removes Total Points From Array ----- */
    var points = $scope.profile.points;
    var reverseSortedPoints = sortPoints(points).reverse();
    reverseSortedPoints.shift();
    $scope.points = reverseSortedPoints;

    /* ----- Reverses Badge Sort Order & Assigns Badges To Scope ----- */
    var badges = $scope.profile.badges;
    badges.reverse();
    $scope.badges = badges;

    $scope.$emit('unload');
  });
    /* ----- Used To Filter Points ----- */
  $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] > val;
    }
  }
})
/* ----- Displays Data While Loading $http Request ----- */
.controller('loadCtrl', ['$scope', function($scope) {
  $scope.$on('load', function() {$scope.loading = true});
  $scope.$on('unload', function() {$scope.loading = false});
}]);

/* ----- Converts Points Object to Array & Sorts Points Data ----- */
function sortPoints(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'skill': prop,
                'points': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return a.points - b.points;
    });
    return arr;
}
