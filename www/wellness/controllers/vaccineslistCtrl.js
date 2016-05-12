angular.module('starter.controllers')

.controller('vaccineslistCtrl', function($scope,$state,$stateParams,DBService,$rootScope) {

       $scope.WN={"emailid":$stateParams.myParam.emailid};
//alert($scope.WN.emailid);
         $scope.menuItemsList=[];

         DBService.readData(queries.readRecord.vaccines,[$scope.WN.emailid]).then(function(res){
         	
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.vaccines,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
						 	});
  $scope.addVaccines=function(){
params={'myParam' :{'emailid':$scope.WN.emailid}};
	localStorage.setItem("navigation","");  
         $state.go('landing.vaccines',params);     	
       }
               $scope.edit=function(vid){
              
          params={'myParam' :{'id':vid}};
         $state.go('landing.vaccines',params);   
          localStorage.setItem("navigation","edit");

               }


                              $scope.delete=function(vid){

DBService.deleteData(queries.deleteRecord.deletevaccineshistory,[vid]).then(function(res){
	


  DBService.readData(queries.readRecord.vaccines,[$scope.WN.emailid]).then(function(res){

  	                             $scope.menuItemsList=[];
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});

});

 

}

 });
