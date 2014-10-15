var QuizModel = function(data){
  this.id = data.id;
  this.title = data.title;
};

QuizModel.prototype.fetch = function(){
  $.get('/quizzes', function(data){
    var results = [];
    for(var i = 0; i < data.length; i++){
      results.push(new QuizModel(data[i]));
    }
    $(document).trigger('showQuizzes', results);
  });
};