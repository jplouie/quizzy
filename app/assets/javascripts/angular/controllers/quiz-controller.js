app.controller('quizController',
  ['$scope', '$timeout', 'Quiz', 'Question', 'Score',
  function($scope, $timeout, Quiz, Question, Score){

  $scope.quizList = true;
  $scope.question = false;
  $scope.status = false;
  $scope.quizForm = false;
  $scope.scoreList = false;
  $scope.quizzes = Quiz.query();

  $scope.select = function(quiz){
    if($scope.quizzes.user){
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
    }
    else{
      $scope.status = true;
      $scope.display = 'You must enter your name!';
      $timeout(function(){
        $scope.status = false;
      }, 1000);
    }
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
      Score.save({
        quiz_id: $scope.questions[0].quiz_id,
        score: {
          score: ($scope.correct/$scope.questions.length*100).toFixed(0),
          user: null
        }});
      $scope.display = 'You must select an answer!';
      $timeout(function(){
        $scope.status = false;
      }, 1000);
    }
  };

  $scope.viewScores = function(){
    $scope.quizList = false;
    $scope.scoreList = true;
    $scope.scores = Score.query();
  };

  $scope.createQuiz = function(){
    $scope.quizList = false;
    $scope.quizForm = true;
  };

  $scope.startOver = function(){
    $scope.quizList = true;
    $scope.question = false;
    $scope.score = false;
    $scope.status = false;
    $scope.quizForm = false;
    $scope.scoreList = false;
    $scope.current = 0;
    $scope.correct = 0;
    $scope.user = '';
  };
}]);