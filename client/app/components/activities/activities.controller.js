(function() {

 'use strict';

  angular
    .module('app.activityList')
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['$scope', '$state', 'activityService'];

  function ActivityController($scope, $state, activityService) {
    var vm = this;
    vm.possibleActivities = [];
    vm.getActivities = getActivities;
    vm.getSelectedActivity = getSelectedActivity;
    vm.getExpedia = getExpedia;
    vm.uuid;

    $scope.$on('uuidChange', function(event, args) {
      // console.log('change detected', event, args.val);
      vm.uuid = args.val;
      console.log('args.val', args.val);
      vm.getActivities(args.val);
      vm.getExpedia(args.val);
    });

    function getActivities(uuid) {
      // $scope.$parent.test = 'overwrite parent test from activity controller';
      console.log('inside controller getActivities', uuid);
      return activityService.getActivities(uuid)
        .then(function(data) {
          data.forEach(function(entry){
            console.log(entry, 'entry');
            var splitz = entry.address.split('');
            for (var i = 0; i < splitz.length; i++) {
              var temp = '';
              if (splitz[i] === '"' || splitz[i] === '{' || splitz[i] === '}') {
                splitz[i] = temp;
              } else if (splitz[i] === ',') {
                splitz[i] += ' ';
              }
            }
            splitz = splitz.join('');
            entry.address = splitz;
          });
          vm.possibleActivities = data;
          console.log('got possibleActivities', data);
        })
        .catch(function(err) {
          console.log("There was an error: ", err);
          return err;
        });
    }

    function getSelectedActivity(activity) {
      console.log('inside activities.controller. you clicked on this:', activity);
      console.log('This is the parent', $scope.$parent.test);
      $scope.$parent.selectedActivity = activity;
      $scope.$parent.console();
      vm.getActivities(vm.uuid);
    }

    function getExpedia(uuid) {
      return activityService.getExpedia(uuid)
      .then(function(data) {
        console.log("THIS IS EXPEDIA DATA!!!!", data);
      })
    }

    setTimeout(function() {
      console.log(vm.uuid, 'this is activities.controller');
      vm.getActivities(vm.uuid);
      vm.getExpedia(vm.uuid);
    }, 1500);
  }
})();
