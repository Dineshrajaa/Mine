angular.module('starter.controllers')

.controller('surgerieslistCtrl', function($scope,$state,$stateParams,DBService,$rootScope) {

       $scope.WN={"emailid":$stateParams.myParam.emailid};
//alert($scope.WN.emailid);
         $scope.menuItemsList=[];

         DBService.readData(queries.readRecord.surgeries,[$scope.WN.emailid]).then(function(res){
         	
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.surgeries,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
						 	});
  $scope.addPastsurgeries=function(){
params={'myParam' :{'emailid':$scope.WN.emailid}};
	localStorage.setItem("navigation","");  
         $state.go('landing.surgeries',params);     	
       }
               $scope.edit=function(psid){
              
          params={'myParam' :{'id':psid}};
         $state.go('landing.surgeries',params);   
          localStorage.setItem("navigation","edit");

               }


                              $scope.delete=function(psid){

DBService.deleteData(queries.deleteRecord.deletesurgerieshistory,[psid]).then(function(res){
	


  DBService.readData(queries.readRecord.surgeries,[$scope.WN.emailid]).then(function(res){
						 		$scope.menuItemsList={};
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});

});

 

}

 });
