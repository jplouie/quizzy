app.factory('Score', ['$resource', function($resource){
  return $resource('/scores/:id');
}]);