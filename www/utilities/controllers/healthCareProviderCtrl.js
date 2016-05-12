angular.module('starter.controllers')

.controller('healthCareProviderCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicHistory,$ionicPopup) {

$scope.WN={"emailid":$stateParams.myParam.emailid};

 DBService.readData(queries.readRecord.healthcare,[$scope.WN.emailid]).then(function(res){
						 		 $scope.details=res.rows.item(0);
	                             if($scope.details.name!=undefined)
	                             $scope.healthcare=$scope.details;
						 		
						 		
						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.healthcare,[$scope.WN.emailid]).then(function(res){
						 		
						 			 $scope.details=res.rows.item(0);
	                                 if($scope.details.name!=undefined)
	                                 $scope.healthcare=$scope.details;
						 		

						 		});
						 	});
       


$scope.healthcare=[];
$scope.healthcare={name:'',
                   type:'',
                   address:'',
                   city:'',
                   state:'',
                   zip:'',
                   email:'',
                   phone:'',
                   cellphone:'',
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
 
$scope.healthcare=[];
DBService.deleteData(queries.deleteRecord.deletehealthcare,[$scope.WN.emailid]).then(function(res){

});

 }

 $scope.saveHealthCare=function(){

DBService.readData(queries.readRecord.healthcare,[$scope.WN.emailid]).then(function(res){

	if(res.rows.length<=0){

	

DBService.writeData(queries.insertRecord.addhealthcare,[$scope.healthcare.name,$scope.healthcare.type,$scope.healthcare.address,$scope.healthcare.city,$scope.healthcare.state,$scope.healthcare.zip,$scope.healthcare.email,$scope.healthcare.phone,$scope.healthcare.cellphone,$scope.healthcare.comments,$scope.WN.emailid]).then(function(res){
 params={"myParam":$stateParams.myParam} ;    
$state.go('menu.adminData',params);

});

	}

	else{

		DBService.updateData(queries.updateRecord.updatehealthcare,[$scope.healthcare.name,$scope.healthcare.type,$scope.healthcare.address,$scope.healthcare.city,$scope.healthcare.state,$scope.healthcare.zip,$scope.healthcare.email,$scope.healthcare.phone,$scope.healthcare.cellphone,$scope.healthcare.comments,$scope.WN.emailid]).then(function(res){
		params={"myParam":$stateParams.myParam} ;    
$state.go('menu.adminData',params);
		});
	}



});


 	}
       //$scope.notesList=[{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"}];

            
 });
