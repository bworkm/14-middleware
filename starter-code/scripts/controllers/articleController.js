'use strict';

(function(module) {
  var articleController = {};

  Article.createTable();

  articleController.index = function(ctx, next) {
    if(ctx.articles.length) {
      articleView.index(ctx.articles);
    } else{
      page('/');
    }
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is declaring a function, calling findWhere and passing in the parameters of the request.
  // It's execution path is /article/:id.
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is declaring a function, calling findWhere and passing in the parameters of the request.
  // It's execution path is '/author/:authorName'.
  articleController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is declaring a function, calling findWhere and passing in the parameters of the request.
  // '/category/:categoryName'
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // DONE: What does this method do?  What is it's execution path?
  // This method creates a function (articleData), then if anything is in the array, Article.allArticles,
  // it assigns the array to ctx.articles. Then calls the next function, if not, then it calls fetchAll and passes in articleData.
  // This method is called through routes.js and it's execution path is '/'.
  articleController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.allArticles;
      next();
    };

    if (Article.allArticles.length) {
      ctx.articles = Article.allArticles;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articleController = articleController;
})(window);
