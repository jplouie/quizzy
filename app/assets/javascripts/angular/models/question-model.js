app.factory('Question', ['$resource', function($resource){
  return $resource('/quizzes/:quiz_id/questions/:id');
}]);