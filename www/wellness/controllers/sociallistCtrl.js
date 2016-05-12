angular.module('starter.controllers')

.controller('sociallistCtrl', function($scope,$state,$stateParams,DBService,$rootScope) {

       $scope.WN={"emailid":$stateParams.myParam.emailid};
//alert($scope.WN.emailid);
         $scope.menuItemsList=[];

         DBService.readData(queries.readRecord.social,[$scope.WN.emailid]).then(function(res){
         	
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.social,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
						 	});
  $scope.addSocial=function(){
params={'myParam' :{'emailid':$scope.WN.emailid}};
//alert($scope.WN.emailid);
//alert(params);
	localStorage.setItem("navigation","");  
         $state.go('landing.social',params);     	
       }
               $scope.edit=function(sid){
          params={'myParam' :{'id':sid}};
         $state.go('landing.social',params);   
          localStorage.setItem("navigation","edit");

               }


                              $scope.delete=function(sid){

DBService.deleteData(queries.deleteRecord.deletesocialhistory,[sid]).then(function(res){
	


  DBService.readData(queries.readRecord.social,[$scope.WN.emailid]).then(function(res){
						 		$scope.menuItemsList={};
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});

});

 

}

 });
