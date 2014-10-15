var QuizListController = function(el){
  this.el = el;
};

QuizListController.prototype.start = function(){
  var control = this;
  new QuizListView(control.el);
  var quiz = new QuizModel({id: 1, title: 'hi'});
  quiz.fetch();
}

$(document).ready(function(){
  var app = new QuizListController('.menu');
  app.start();
});