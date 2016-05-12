angular.module('starter.controllers')

.controller('drugslistCtrl', function($scope,$state,$stateParams,DBService,$rootScope) {


$scope.WN={"emailid":$stateParams.myParam.emailid};


       
         $scope.drugsItems={};

         DBService.readData(queries.readRecord.drugs,[$scope.WN.emailid]).then(function(res){
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.drugsItems[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.drugs,[$scope.WN.emailid]).then(function(res){
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.drugsItems[i]=temp;
						 			}

						 		});
						 	});
       

       $scope.addDrugs=function(){
	params={'myParam' :{'emailid':$scope.WN.emailid}};
	localStorage.setItem("navigation","");  

         $state.go('landing.drugs',params);     	
       }
        


                $scope.edit=function(did){
              
          params={'myParam' :{'id':did}};
         $state.go('landing.drugs',params);   
          localStorage.setItem("navigation","edit");

               }


                $scope.delete=function(did){

DBService.deleteData(queries.deleteRecord.deletedrugshistory,[did]).then(function(res){
	


  DBService.readData(queries.readRecord.drugs,[$scope.WN.emailid]).then(function(res){

  	                                 $scope.drugsItems={};
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.drugsItems[i]=temp;
						 			}

						 		});

});

 

}


       

            
 });
