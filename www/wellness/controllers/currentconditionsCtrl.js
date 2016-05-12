angular.module('starter.controllers')

.controller('currentconditionsCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicPopup) {
	
$scope.WN={"emailid":$stateParams.myParam.emailid};
$scope.date=new Date();
$scope.condition=[];
   $scope.conditionForm={
    name:'',
    startDate:'',
    endDate:'',
    comment:''
   };

$scope.conditionForm.startDate=new Date($scope.date);
$scope.conditionForm.endDate=new Date($scope.date);
   $scope.EditConditionId = "";
 //    $scope.IsSave = true;
	// $scope.IsDone = false;
	// $scope.IsDone = $scope.IsDone ? false : true;
	// $scope.IsSave = $scope.IsSave ? false : true;



  if($stateParams.myParam!=null){
          $scope.conditionForm.emailid=$stateParams.myParam.emailid;
          $scope.conditionForm.type=null;
            }

	if(localStorage.getItem("fetchCurrentcondition")=="Update"){
	//	alert("Update"+$scope.EditConditionId);
DBService.readData(queries.readRecord.conditionList,[$scope.WN.emailid]).then(function(res){
	//alert("length"+res.rows.length);

                    $scope.details=res.rows.item(0);
                  
                    $scope.conditionForm=$scope.details;
                     $scope.conditionForm.startDate=new Date($scope.details.startDate);
                     $scope.conditionForm.endDate=new Date($scope.details.endDate); 
                $scope.EditConditionId =  $scope.conditionForm.conditionid;


                });
}

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

$scope.saveBtnClicked=false;

          $scope.saveCurrentCondition=function(){
            $scope.saveBtnClicked=true;

            if($scope.conditionForm.name!=""){
          	if(localStorage.getItem("fetchCurrentcondition")=="Update"){
              
          		 DBService.updateData(queries.updateRecord.updateCondition,[$scope.conditionForm.name,$scope.conditionForm.startDate,$scope.conditionForm.endDate,$scope.conditionForm.comment,$scope.EditConditionId]).then(function(res){
	 DBService.readData(queries.readRecord.conditionList,[$scope.WN.emailid]).then(function(res){
	 		//alert("updateCondition"+res.rows.length);
         $scope.conditionForm=[];
                    $scope.details=res.rows.item(0);
                  
                    $scope.conditionForm=$scope.details;
                $scope.EditConditionId =  $scope.conditionForm.conditionid;
               


                });

                });
          	}
          	else{
          		 DBService.writeData(queries.insertRecord.addCondition,[$scope.conditionForm.name,$scope.conditionForm.startDate,$scope.conditionForm.endDate,$scope.conditionForm.comment,$scope.WN.emailid]).then(function(res){
              localStorage.setItem("fetchCurrentcondition","Update"); 
  DBService.readData(queries.readRecord.conditionList,[$scope.WN.emailid]).then(function(res){
  //	alert("addCondition"+res.rows.length);
                    $scope.details=res.rows.item(0);
                  
                    $scope.conditionForm=$scope.details;
                $scope.EditConditionId =  $scope.conditionForm.conditionid;



                });
      
                 });

  //              DBService.readData(queries.readRecord.conditionList,[$scope.WN.emailid]).then(function(res){
  // //  alert("addCondition"+res.rows.length);
  // $scope.conditionForm=[];
  //                   $scope.details=res.rows.item(0);
                  
  //                   $scope.conditionForm=$scope.details;
  //                     $scope.conditionForm.startDate=new Date($scope.details.startDate);
  //                    $scope.conditionForm.endDate=new Date($scope.details.endDate); 

  //               $scope.EditConditionId =  $scope.conditionForm.conditionid;


  //               });


          	}
        
 }

}

$scope.delete=function(){
   $scope.conditionForm={
    name:'',
    startDate:'',
    endDate:'',
    comment:''
   };
DBService.deleteData(queries.deleteRecord.deletecurrentcondition,[$scope.WN.emailid]).then(function(res){

localStorage.setItem("fetchCurrentcondition",""); 

$scope.conditionForm.startDate=new Date($scope.date);
$scope.conditionForm.endDate=new Date($scope.date);
});

 }
       
            
 });
