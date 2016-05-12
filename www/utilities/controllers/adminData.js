angular.module('starter.controllers')

.controller('adminDataCtrl', function($scope,$state) {

       $scope.adminDataList=[{"title":"Health Care Provider"},{"title":"Insurance"},{"title":"Emergenct Contact"},{"title":"Documents"}];
       $scope.itemClick=function(item){
       if(item.title=="Health Care Provider"){
     	$state.go('landing.healthCareProvider');
       }else   if(item.title=="Insurance"){
     	$state.go('landing.insurance');
       }


       }
            
 });
