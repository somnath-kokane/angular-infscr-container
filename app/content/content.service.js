
!function(){
  'use strict';

  angular
    .module('app')
    .factory('ContentService', ContentService);

  ContentService.$inject = ['$http', 'CacheService'];

  function ContentService($http, CacheService){

    var cache = CacheService.get('content');

    return {
      get: get,
      getAll: getAll
    };

    function get(id){
      var url = 'data/content.json';

      return $http 
        .get(url, {cache: cache})
        .then(function(res){
          return res.data;
        })
    }

    function getAll(){
      var url = 'data/contents.json';

      return $http 
        .get(url, {cache: cache})
        .then(function(res){
          return res.data;
        })
    }
  }

}()