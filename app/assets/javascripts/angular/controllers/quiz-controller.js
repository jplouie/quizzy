app.controller('quizController', ['$scope', 'Quiz', function($scope, Quiz){
  $scope.quizzes = Quiz.query();
}]);