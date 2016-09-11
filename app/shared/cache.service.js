
!function(){
  'use strict';

  angular
    .module('app.shared')
    .factory('CacheService', CacheService)

  CacheService.$inject = ['$cacheFactory'];

  function CacheService($cacheFactory){
    
    var caches = {};

    return {
      get: get
    };

    function get(cacheId){
      if(caches[cacheId]){
        return caches[cacheId];
      }
      return caches[cacheId] = $cacheFactory(cacheId);
    }
  }

}();