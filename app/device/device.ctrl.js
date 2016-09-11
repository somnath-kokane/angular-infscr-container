
!function(){
  'use strict';

  angular
    .module('app')
    .controller('DeviceCtrl', DeviceCtrl)

  DeviceCtrl.$inject = ['$scope', '$element', 'DeviceService', 'ContentService'];

  function DeviceCtrl($scope, $el, DeviceService, ContentService){
    var vm = this;
    vm.activate = activate
    
    activate();

    function activate(){
       vm.deviceContainer = [];
       vm.getDevices = getDevices;
    }

    function getDevices(page){
      return DeviceService.getAll({page: page}).then(function(data){
        data.forEach(function(item){
          item.name += ' ( page '+page+')';
        })
        return data;
      });
    }

    function getContents(){
      ContentService 
        .getAll()
        .then(function(data){
          console.log('contents', data);
        })
    }

  }

}()