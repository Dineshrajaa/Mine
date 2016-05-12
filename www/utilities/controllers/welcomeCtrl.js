angular.module('starter.controllers')

.controller('welcomeCtrl', function($scope,$state,DBService) {

       
$scope.gotoprofile=function(){

	DBService.readData(queries.readRecord.login,[$scope.emailId]).then(function(res){
      if(res.rows.length!=0){
        params={'myParam' :res.rows.item(0)};
       
          if(localStorage.getItem("firstTime")==undefined){
            $state.go('landing.createprofile',params);
          }else{
            $state.go('landing.profileSetup');
          }
        
      }
    });

	
}
            
 });
