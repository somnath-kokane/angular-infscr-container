
!function(){
  'use strict';

  angular
    .module('app.shared')
    .directive('infscr', infscr)

  infscr.$inject = ['$compile'];

  function infscr($compile){

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'app/shared/infscr/infscr.tpl.html',
      scope: true,
      bindToController: {
        container: '='
      },
      controller: ['$scope', InfScrCtrl],
      controllerAs: 'infscr',
      compile: function(element, attrs){
        return postLink;
      }
    };

    function postLink(scope, element, attrs, infscr){
      var el = element[0];
      var _onScroll = _.debounce(onScroll, 600);

      init();

      function init(){
        var pageChangeHandler = scope.$parent.$eval(attrs.pageChangeHandler);
        element.on('scroll', _onScroll);
        infscr.pageChangeHandler = pageChangeHandler;
        infscr.scrollTo = scrollTo;
        infscr.activate();
      }

      function onScroll(ev){
        var scrollTop = this.scrollTop;
        var scrollHeight = this.scrollHeight;
        var height = $(this).height();
        var bottom = scrollHeight - (scrollTop + height);
        
        if(scrollTop == 0){
          infscr.prevPage();
        } else if(bottom <= 0){
          infscr.nextPage();
        }
      }

      function scrollTo(next){
        var scrollHeight = el.scrollHeight;

        if(next){
          el.scrollTop -= scrollHeight/2;
        } else {
          el.scrollTop += scrollHeight/2;
        }
      }
    }

    function InfScrCtrl($scope){
      var infscr = this;
      var page = 0;
      var max = 10;
      var nextPrev;
      
      infscr.activate = function activate(){
        infscr.nextPage = nextPage;
        infscr.prevPage = prevPage;
        nextPage();
      }

      function getData(page, next){
        infscr.pageChangeHandler(page)
          .then(function(data){
            addToContainer(data, next);
            infscr.page = page;
          })
      }

      function addToContainer(data, next){
        if(infscr.container.length > 1){
          if(next){
            infscr.container.shift();
            infscr.container.push(data);
          } else {
            infscr.container.pop();
            infscr.container.unshift(data);
          }
          infscr.scrollTo(next);
        } else {
          infscr.container.push(data);
        }
      }

      function nextPage(){
        if(nextPrev == 'prev'){
          page += 1; 
        }
        if(page < max){
          page += 1;
          nextPrev = 'next';
          getData(page, true);
        }
      }

      function prevPage(){
        if(nextPrev == 'next'){
          page -= 1;
        }
        if(page > 1){
          page -= 1;
          nextPrev = 'prev'; 
          getData(page, false);
        }
      }

    }
  }

}()