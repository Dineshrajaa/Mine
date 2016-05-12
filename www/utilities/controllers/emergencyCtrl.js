angular.module('starter.controllers')

.controller('emergencyCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicHistory,$ionicPopup) {

        $scope.WN={"emailid":$stateParams.myParam.emailid};



        



 DBService.readData(queries.readRecord.emergency,[$scope.WN.emailid]).then(function(res){
						 		 $scope.details=res.rows.item(0);
	                              if($scope.details.name!=undefined)
	                             $scope.emergency=$scope.details;
	                             //alert(JSON.stringify($scope.emergency));
						 		
						 		
						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.emergency,[$scope.WN.emailid]).then(function(res){
						 		
						 			 $scope.details=res.rows.item(0);
	                                  if($scope.details.name!=undefined)
	                                 $scope.emergency=$scope.details;
	                                 //alert(JSON.stringify($scope.emergency));
						 		

						 		});
						 	});
       


$scope.emergency=[];
$scope.emergency = { name: '' ,
                             phone:'',
                             cellphone:'',
                             email1:'',
                             email2:'',
                             city:'',
                             state:'',
                             zip:'',
                             comments:''
                            };




$scope.GoBack = function() {
    $ionicHistory.goBack();
  };


$scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title:'Delete Record',
     template: 'Are you sure need to delete the record?',
     cancelText: 'YES',
     okText: 'NO',
     cancelType:'button-assertive',
     okType:'button-positive'
   });

   confirmPopup.then(function(res) {

    if(res==false)
    {
      $scope.delete();
    }
     if(res==true) {
       
     } 
   });
 };



$scope.delete=function(){
 
$scope.emergency=[];
DBService.deleteData(queries.deleteRecord.deleteemergency,[$scope.WN.emailid]).then(function(res){

});

 }

 $scope.saveEmergencyContacts=function(){

DBService.readData(queries.readRecord.emergency,[$scope.WN.emailid]).then(function(res){

	if(res.rows.length<=0){

	

DBService.writeData(queries.insertRecord.addemergency,[$scope.emergency.name,$scope.emergency.relation,$scope.emergency.phone,$scope.emergency.cellphone,$scope.emergency.email1,$scope.emergency.email2,$scope.emergency.city,$scope.emergency.state,$scope.emergency.zip,$scope.emergency.comments,$scope.WN.emailid]).then(function(res){
 params={"myParam":$stateParams.myParam} ;    
$state.go('menu.adminData',params);

});

	}

	else{

		DBService.updateData(queries.updateRecord.updateemergency,[$scope.emergency.name,$scope.emergency.relation,$scope.emergency.phone,$scope.emergency.cellphone,$scope.emergency.email1,$scope.emergency.email2,$scope.emergency.city,$scope.emergency.state,$scope.emergency.zip,$scope.emergency.comments,$scope.WN.emailid]).then(function(res){
		params={"myParam":$stateParams.myParam} ;    
$state.go('menu.adminData',params);
		});
	}



});


 	}


            
 });
