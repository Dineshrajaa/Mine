angular.module('starter.controllers')

.controller('medicalhistoryCtrl', function($scope,$state,$stateParams,DBService,$ionicHistory,$ionicPopup) {

$scope.id=$stateParams.myParam.id;
$scope.date=new Date();

if(localStorage.getItem("navigation")=="edit"){
DBService.readData(queries.readRecord.medicaledithistory,[$scope.id]).then(function(res){

	                 $scope.employee=res.rows.item(0);
                
	                
	                 $scope.medicalRecord=$scope.employee;

                   // if($scope.employee.startdate=="undefined"){
                   //  $scope.medicalRecord.startdate=new Date($scope.date);
                   // }
                   // else{
                   //  $scope.medicalRecord.startdate=new Date($scope.employee.startdate);
                   // }

                   // if($scope.employee.enddate=="undefined"){
                   //  $scope.medicalRecord.enddate=new Date($scope.date);
                   // }
                   // else{
                   //  $scope.medicalRecord.enddate=new Date($scope.employee.enddate);
                   // }

$scope.medicalRecord.startdate=new Date($scope.employee.startdate);
$scope.medicalRecord.enddate=new Date($scope.employee.enddate);
						 		});

}




        $scope.medicalRecord={};
        $scope.medicalRecord={name:'',
                              type:'Familial',
                              startdate:'',
                              enddate:'',
                              comments:''

        };
 

$scope.medicalRecord.startdate=new Date($scope.date);
$scope.medicalRecord.enddate=new Date($scope.date);   

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



if($stateParams.myParam!=null){
          $scope.medicalRecord.emailid=$stateParams.myParam.emailid;
          //$scope.medicalRecord.type=null;
            }


$scope.saveBtnClicked=false;
$scope.saveMedicalRecord=function(){
  $scope.saveBtnClicked=true;


if($scope.medicalRecord.name!=""){
if(localStorage.getItem("navigation")=="edit"){

	


	DBService.updateData(queries.updateRecord.updatemedicalhistory,[$scope.medicalRecord.name,$scope.medicalRecord.type,$scope.medicalRecord.startdate,$scope.medicalRecord.enddate,$scope.medicalRecord.comments,$scope.id]).then(function(res){
		
                                                                                                                                                                                        
              params={"myParam":{"emailid":$scope.medicalRecord.emailid}} ;    
              $state.go('menu.medicalHistorylist',params);
                });

}

else{
  
  DBService.writeData(queries.insertRecord.addmedicalhistory,[$scope.medicalRecord.name,$scope.medicalRecord.type,$scope.medicalRecord.startdate,$scope.medicalRecord.enddate,$scope.medicalRecord.comments,$scope.medicalRecord.emailid]).then(function(res){
                                                                                                                                                                                        
              params={"myParam":{"emailid":$scope.medicalRecord.emailid}} ;    
              $state.go('menu.medicalHistorylist',params);
                });
}
                                                                                                                                                                                      
}

}

              $scope.delete=function(){

DBService.deleteData(queries.deleteRecord.deletemedicalhistory,[$scope.id]).then(function(res){
   $state.go('menu.medicalHistorylist',params);
  
});

 

}


});
