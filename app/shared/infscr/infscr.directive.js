
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
        var handler = scope.$parent.$eval(attrs.handler);
        element.on('scroll', _onScroll);
        infscr.handler = handler();
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

      function getHandler(event, data){
        return infscr.handler;
      }

      function getData(page, next){

        getHandler().onPage(page)
          .then(function(data){
             addToContainer(data, next);
          })
      }

      function addToContainer(data, next){
        var rData, obj = {};
        var container = getHandler().container;
        if(container.length > 1){
          if(next){
            obj.removed = true;
            rData = container.shift();
            container.push(data);
          } else {
            obj.removed = true;
            rData = container.pop();
            container.unshift(data);
          }
          infscr.scrollTo(next);
        } else {
          container.push(data);
        }
        if(rData){
          obj.data = angular.copy(rData);
        }
        getHandler().onData(data, obj);
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