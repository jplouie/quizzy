var QuizListView = function(el){
  this.el = el;
  var template = $('.quiz-menu-template').html();
  this.uncompiledTemplate = _.template(template);
  var view = this;

  $(document).on('showQuizzes', function(e){
    var list = [];
    for(var i = 1; i < arguments.length; i++){
      list.push(arguments[i]);
    }
    view.showQuizzes(list);
  })
};

QuizListView.prototype.showQuizzes = function(quizList){
  var compiledTemplate = this.uncompiledTemplate({data: quizList});
  var $elem = $(compiledTemplate);
  $(this.el).empty().append($elem);
};
