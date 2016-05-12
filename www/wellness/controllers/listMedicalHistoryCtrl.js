angular.module('starter.controllers')

.controller('medicalHistorylistCtrl', function($scope,$state,$stateParams,$rootScope,$ionicListDelegate,DBService) {

       
$scope.WN={"emailid":$stateParams.myParam.emailid};

            
                    $scope.menuItemsList=[];

DBService.readData(queries.readRecord.medicalhistory,[$scope.WN.emailid]).then(function(res){
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
 $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.medicalhistory,[$scope.WN.emailid]).then(function(res){
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 			}

						 		});
						 	});
       
  $scope.showMedicalItem=function(){

         $state.go('landing.medicalHistoryView');     	
       }
            
       
     $scope.addMedicalRecord=function(){
  params={'myParam' :{'emailid':$scope.WN.emailid}};
         $state.go('landing.medicalhistory',params);  
         localStorage.setItem("navigation","");   	
       }
               

               $scope.edit=function(name,mhid){
               
          params={'myParam' :{'id':mhid}};
         $state.go('landing.medicalhistory',params);   
          localStorage.setItem("navigation","edit");

               }

               $scope.delete=function(mhid){

DBService.deleteData(queries.deleteRecord.deletemedicalhistory,[mhid]).then(function(res){
	


DBService.readData(queries.readRecord.medicalhistory,[$scope.WN.emailid]).then(function(res){
	
                                     $scope.menuItemsList=[];
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.menuItemsList[i]=temp;
						 				
						 			}

						 			


						 		});



	});

 

}

          
        
   });
