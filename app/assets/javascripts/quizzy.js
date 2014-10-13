$(document).ready(function(){
  var $main = $('.main-content');

  var all_quizzes = function(){
    $.get('/quizzes', function(data){
      var template = $('.quiz-menu-template').html();
      var uncompiledTemplate = _.template(template);
      var compiledTemplate = uncompiledTemplate({data: data});
      var $elem = $(compiledTemplate);
      $main.empty().append($elem);
    })
  };

  $main.on('click', '.go', function(){
    var name = $('input').val();
    if(name){
      $main.data('user', name);
      $main.data('current', 0);
      var current = $main.data('current');
      var quizId = $(this).parent().data('quiz');
      $.get('/quizzes/' + quizId + '/questions', function(data){
        displayQuestion(data, current);
      });
    }
    else{
      $('.error').empty().append('<p>You must enter your name!</p>');
    }
  });

  $main.on('click', '.next', function(){
    var quizId = $(this).parent().data('quiz');
    var questionId = $(this).parent().data('question');
    var answer = $('input:checked').val();
    var current = $main.data('current') + 1;
    $main.data('current', current);
    var status = calculateAnswer(answer, quizId, questionId, current);
  });

  $main.on('click', '.home', function(){
    all_quizzes();
  });

  var displayStatus = function(status){
    if(status)
      $('.status').append('<h3>Correct!!</h3>');
    else
      $('.status').append('<h3>Incorrect...</h3>');
  };

  var calculateAnswer = function(answer, quizId, questionId, current){
    var status;
    $.get('/quizzes/' + quizId + '/questions/' + questionId, function(data){
      if(data.answer === answer){
        $main.data('score', $main.data('score') + 1);
        status = true;
      }
      else
        status = false;

      $.get('/quizzes/' + quizId + '/questions', function(data){
        if(questionId !== data[data.length - 1].id){
          displayStatus(status);
          setTimeout(function(){
            $('.status').empty();
            displayQuestion(data, current);
          }, 1000);
        }
        else{
          var score = $main.data('score');
          var total = data.length;
          var user = $main.data('user');

          $.post('/scores',
            {score: {score: score, user: user }, quiz_id: quizId},
            function(){
              var template = $('.score-template').html();
              var uncompiledTemplate = _.template(template);
              var compiledTemplate = uncompiledTemplate({score: score, total: total, name: user});
              var $elem = $(compiledTemplate);
              $main.empty().append($elem);
          });
        }
      });
    });
  };

  var displayQuestion = function(data, current){
    var choices = data[current].choices.split(';');
    var template = $('.question-template').html();
    var uncompiledTemplate = _.template(template);
    var compiledTemplate = uncompiledTemplate({data: data, choices: choices, current: current});
    var $elem = $(compiledTemplate);
    $main.empty().append($elem);
  };

  all_quizzes();
});