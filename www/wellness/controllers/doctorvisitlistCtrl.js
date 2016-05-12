angular.module('starter.controllers')

.controller('doctorvisitlistCtrl', function($scope,$state,$stateParams,DBService,$rootScope) {


$scope.WN={"emailid":$stateParams.myParam.emailid};


       
         $scope.visitsItems={};

         DBService.readData(queries.readRecord.visits,[$scope.WN.emailid]).then(function(res){
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.visitsItems[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.visits,[$scope.WN.emailid]).then(function(res){
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.visitsItems[i]=temp;
						 			}

						 		});
						 	});
       

       $scope.addVisits=function(){
	params={'myParam' :{'emailid':$scope.WN.emailid}};
	localStorage.setItem("navigation","");  

         $state.go('landing.doctorvisits',params);     	
       }
        


                $scope.edit=function(dvid){
              
          params={'myParam' :{'id':dvid}};
         $state.go('landing.doctorvisits',params);   
          localStorage.setItem("navigation","edit");

               }


                $scope.delete=function(dvid){

DBService.deleteData(queries.deleteRecord.deletevisitshistory,[dvid]).then(function(res){
	


  DBService.readData(queries.readRecord.visits,[$scope.WN.emailid]).then(function(res){

  	                                 $scope.visitsItems={};
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.visitsItems[i]=temp;
						 			}

						 		});

});

 

}


       

            
 });
