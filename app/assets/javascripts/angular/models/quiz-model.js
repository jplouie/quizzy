app.factory('Quiz', ['$resource', function($resource){
  return $resource('/quizzes/:id');
}]);