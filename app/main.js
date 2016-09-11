
!function(){
  'use strict';

  angular.module('app', []);
  angular.module('app.shared', []);

  angular.module('main', ['app', 'app.shared']);

  angular.element(document).ready(function(){
    angular.bootstrap(document, ['main']);
  })

}();