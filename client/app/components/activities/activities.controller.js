(function() {

 'use strict';

  angular
    .module('app.activityList')
    .controller('ListController')

  ListController.$inject = ['$state', 'listService'];

  function ListController($state, listService) {
    var vm = this;
    vm.getActivities = getActivities;
    vm.getActivities();
  }

})();