angular.module('starter.controllers')

.controller('adminDataCtrl', function($scope,$state,$stateParams) {

 
  //alert(JSON.stringify($stateParams.myParam));


       $scope.adminDataList=[{"title":"Health Care Provider"},{"title":"Insurance"},{"title":"Emergency Contact"},{"title":"Documents"}];
       $scope.itemClick=function(item){

 params={'myParam' :$stateParams.myParam};

       if(item.title=="Health Care Provider"){
     	$state.go('landing.healthCareProvider',params);
       }
       else   if(item.title=="Insurance"){
     	$state.go('landing.insurance',params);
       }

       else if(item.title=="Emergency Contact"){

       	$state.go('landing.emergency',params);
       }

        else if(item.title=="Documents"){

       	$state.go('landing.documents',params);
       }


       }
            
 });
