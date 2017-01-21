'use strict';

(function(module) {

  var articleView = {};

  var render = function(article) {
    var template = Handlebars.compile($('#article-template').text());

    article.daysAgo =
      parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);
    article.publishStatus =
      article.publishedOn ? 'published ' +
      article.daysAgo + ' days ago' : '(draft)';
    article.body = marked(article.body);

    return template(article);
  };

  // DONE: What does this method do?  What is it's execution path?
  // This is compiling Handlebars on the option-template. Then it's using the map function, to map the array, with a function call
  // with author as an object, then it's returning HTML strings that will be appended to author-filter. Then it runs
  // article.allCategories and passing in function rows as a callback and append the objects to category-filter.
  // Then it calls from articleController.index. It's a callback function of articleController.index, and has multiple execution
  // paths.
  articleView.populateFilters = function() {
    var options;
    var template = Handlebars.compile($('#option-template').text());
    options = Article.allAuthors()
      .map(function(author) {
        return template({val: author});
      });
    $('#author-filter').append(options);

    Article.allCategories(function(rows) {
      $('#category-filter').append(
        rows.map(function(row) {
          return template({val: row.category});
        })
      );
    });
  };

  // DONE: What does this method do?  What is it's execution path?
  // This method is setting an event handler on filters that will only run once. Then it is updating the page based on what filter
  // you select and making a new URL.
  articleView.handleFilters = function() {
    $('#filters').one('change', 'select', function() {
      var resource = this.id.replace('-filter', '');
      $(this).parent().siblings().children().val('');
      page('/' + resource + '/' +
      // Replace any/all whitespace with a '+' sign
        $(this).val().replace(/\W+/g, '+')
      );
    });
  };
/* articleView.handleAuthorFilter = function() {
     $('#author-filter').on('change', function() {
       if ($(this).val()) {
         $('article').hide();
         $('article[data-author="' + $(this).val() + '"]').fadeIn();
       } else {
         $('article').fadeIn();
         $('article.template').hide();
       }
       $('#category-filter').val('');
     });
   };

   articleView.handleCategoryFilter = function() {
     $('#category-filter').on('change', function() {
       if ($(this).val()) {
         $('article').hide();
         $('article[data-category="' + $(this).val() + '"]').fadeIn();
       } else {
         $('article').fadeIn();
`        $('article.template').hide();
        }
       $('#author-filter').val('');
     });
   };

   DONE: Remove the setTeasers method,
    and replace with a plain ole link in the article template.
   articleView.setTeasers = function() {
     $('.article-body *:nth-of-type(n+2)').hide();

     $('#articles').on('click', 'a.read-on', function(e) {
       e.preventDefault();
       $(this).parent().find('*').fadeIn();
       $(this).hide();
     });
   }; */

  // COMMENT: What does this method do?  What is it's execution path?
  // This method is declaring a function and then it hides the about page. Then it removes all of the articles and updates the page
  // and creates an html tag to add to the the index page at #articles and appends it into the page.
  // Then it calls the functions populateFilters and handleFilters.
  articleView.index = function(articles) {
    $('#articles').show().siblings().hide();

    $('#articles article').remove();
    articles.forEach(function(a) {
      $('#articles').append(render(a));
    });

    articleView.populateFilters();
    articleView.handleFilters();

    // DONE: Replace setTeasers with just the truncation logic, if needed:
    if ($('#articles article').length > 1) {
      $('.article-body *:nth-of-type(n+2)').hide();
    }
  };

  module.articleView = articleView;
})(window);
