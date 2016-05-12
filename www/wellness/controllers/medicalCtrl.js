angular.module('starter.controllers')

.controller('medicalViewCtrl', function($scope,$state) {

       $scope.groups = [];
       $scope.currDate= new Date();
       $scope.mediacalItems=["Diabetes","Kidney Problem","Neuropathy","Retinopathy","Other Diabetes"];
  for (var i=0; i<$scope.mediacalItems.length; i++) {
    $scope.groups[i] = {
      name: $scope.mediacalItems[i],
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
        
       

            
 });
