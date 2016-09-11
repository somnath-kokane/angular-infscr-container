
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
       vm.infscrHander = infscrHander;
    }

    function infscrHander(){
      return {
        container: vm.deviceContainer,
        onPage: getDataByPage,
        onData: onData
      }
    }

    function onData(data, obj){
      if(obj.removed){
        console.log('data removed from container', obj);
      }

      console.log('data added to container', data);
    }

    function getDataByPage(page){
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