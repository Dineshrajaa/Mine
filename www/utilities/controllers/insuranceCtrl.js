angular.module('starter.controllers')

.controller('insuranceCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicHistory,$ionicPopup) {

       //$scope.notesList=[{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"},{"title":"note 1"}];


       $scope.WN={"emailid":$stateParams.myParam.emailid};

 DBService.readData(queries.readRecord.insurance,[$scope.WN.emailid]).then(function(res){
						 		 $scope.details=res.rows.item(0);
	                              if($scope.details.name!=undefined){
	                             $scope.insurance=$scope.details;

	                             $scope.insurance.startdate=new Date(res.rows.item(0).startdate);
						 		 $scope.insurance.enddate=new Date(res.rows.item(0).enddate);
						 		}
						 		
						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.insurance,[$scope.WN.emailid]).then(function(res){
						 		
						 			 $scope.details=res.rows.item(0);
	                 if($scope.details.name!=undefined){
	                                 $scope.insurance=$scope.details;
	                                  $scope.insurance.startdate=new Date(res.rows.item(0).startdate);
	                                  $scope.insurance.enddate=new Date(res.rows.item(0).enddate);

	                              }
						 		

						 		});
						 	});
       


$scope.insurance=[];
$scope.insurance={name:'',
                  address:'',
                  city:'',
                  state:'',
                  zip:'',
                  email:'',
                  phone:'',
                  cellphone:'',
                  groupid:'',
                  insuranceid:'',
                  startdate:'',
                  enddate:'',
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
 
$scope.insurance=[];
DBService.deleteData(queries.deleteRecord.deleteinsurance,[$scope.WN.emailid]).then(function(res){

});

 }
 $scope.saveInsurance=function(){

DBService.readData(queries.readRecord.insurance,[$scope.WN.emailid]).then(function(res){

	if(res.rows.length<=0){

	

DBService.writeData(queries.insertRecord.addinsurance,[$scope.insurance.name,$scope.insurance.address,$scope.insurance.city,$scope.insurance.state,$scope.insurance.zip,$scope.insurance.email,$scope.insurance.phone,$scope.insurance.cellphone,$scope.insurance.groupid,$scope.insurance.insuranceid,$scope.insurance.startdate,$scope.insurance.enddate,$scope.insurance.comments,$scope.WN.emailid]).then(function(res){
 params={"myParam":$stateParams.myParam} ;    
$state.go('menu.adminData',params);

});

	}

	else{

		DBService.updateData(queries.updateRecord.updateinsurance,[$scope.insurance.name,$scope.insurance.address,$scope.insurance.city,$scope.insurance.state,$scope.insurance.zip,$scope.insurance.email,$scope.insurance.phone,$scope.insurance.cellphone,$scope.insurance.groupid,$scope.insurance.insuranceid,$scope.insurance.startdate,$scope.insurance.enddate,$scope.insurance.comments,$scope.WN.emailid]).then(function(res){
		params={"myParam":$stateParams.myParam} ;    
$state.go('menu.adminData',params);
		});
	}



});


 	}

            
 });
