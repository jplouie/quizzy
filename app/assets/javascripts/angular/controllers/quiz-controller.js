app.controller('quizController', ['$scope', '$timeout', 'Quiz', 'Question',
  function($scope, $timeout, Quiz, Question){

  $scope.quizList = true;
  $scope.question = false;
  $scope.status = false;
  $scope.quizzes = Quiz.query();

  $scope.select = function(quiz){
    $scope.quizList = false;
    $scope.question = true;
    $scope.current = 0;
    $scope.correct = 0;
    $scope.questions = Question.query({quiz_id: quiz.id}, function(quizQuestions){
      for(var i = 0; i < quizQuestions.length; i++){
        quizQuestions[i].choices = quizQuestions[i].choices.split(';');
      }
      $scope.question = $scope.questions[$scope.current];
    });
  };

  $scope.next = function(ans){
    $scope.status = true;
    if(ans){
      if(ans === $scope.questions[$scope.current].answer){
        $scope.correct++;
        $scope.display = 'CORRECT!!!';
      }
      else
        $scope.display = 'NO...WRONG!!';

      if($scope.current + 1 === $scope.questions.length){
        $timeout(function(){
          $scope.question = false;
          $scope.status = false;
          $scope.score = true;
        }, 1000);
      }
      else{
        $timeout(function(){
          $scope.question = $scope.questions[++$scope.current];
          $scope.status = false;
        }, 1000);
      }
    }
    else{
      $scope.display = 'You must select an answer!';
      $timeout(function(){
        $scope.status = false;
      }, 1000);
    }
  };

  $scope.startOver = function(){

  };
}]);