
!function(){
  'use strict';

  angular
    .module('app')
    .factory('DeviceService', DeviceService)

    DeviceService.$inject = ['$http', '$q', 'CacheService'];

    function DeviceService($http, $q, CacheService){

      var cache = CacheService.get('device');

      return {
        get: get,
        getAll: getAll
      };

      function get(id){
        var url = 'data/device.json';

        return $http
          .get(url, {cache: cache})
          .then(function(res){
            return res.data;
          });
      }

      function getAll(opt){
        var page = opt.page;
        var url = 'data/devices.json?page='+page;

        return $http
          .get(url, {cache: cache})
          .then(function(res){
            return res.data;
          })
      }

    }

}()