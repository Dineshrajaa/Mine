angular.module('starter.controllers')

.controller('biometryCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicPopup) {

$scope.WN={"emailid":$stateParams.myParam.emailid};



   $scope.bioMetericId=""
   $scope.BMIHeightMeters=""
   $scope.BMIHeightSquare=""
   $scope.BAIHeightMeters=""
	 $scope.BMIResult=""
	 $scope.WHRResult=""
	 $scope.BAIResult=""
   $scope.denomentor = ""
   $scope.numerator = ""
   $scope.biometeryForm=[];




if(localStorage.getItem("fetchBioMetric")=="Update"){
// DBService.readData(queries.readRecord.biometeryList,[$scope.WN.emailid]).then(function(res){
//                     $scope.details=res.rows.item(0);
                  
//                     $scope.biometeryForm=$scope.details;
//                 $scope.bioMetericId =  $scope.biometeryForm.biometeryid;


//                 });
//alert($scope.WN.emailid);
  DBService.readData(queries.readRecord.biometeryList,[$scope.WN.emailid]).then(function(res){
//alert(res.rows.length)
                $scope.biometeryForm=[];
                  $scope.details=res.rows.item(0);
                  
                    $scope.biometeryForm=$scope.details;
                $scope.bioMetericId =  $scope.biometeryForm.biometeryid;

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


 $scope.delete=function(){
    $scope.biometeryForm={
  systolic:'',
  diastolic:'',
  temperature:'',
  extrasystolic:'',
  irregularvalue:''
};
  DBService.deleteData(queries.deleteRecord.deletebiometry,[$scope.WN.emailid]).then(function(res){
localStorage.setItem("fetchBioMetric",""); 
  });

 }

 $scope.biometeryForm={
  systolic:'',
  diastolic:'',
  temperature:'',
  extrasystolic:'',
  irregularvalue:''
};

  if($stateParams.myParam!=null){
          $scope.biometeryForm.emailid=$stateParams.myParam.emailid;
          $scope.biometeryForm.type=null;
            }



 $scope.caculateBMI=function(){
 	  $scope.BMIHeightMeters = $scope.biometery.BMIheight / 100
    $scope.BMIHeightSquare = Math.pow($scope.BMIHeightMeters, 2)
    $scope.BMIResult = $scope.biometery.BMIweight / $scope.BMIHeightSquare.toFixed(2);
    $scope.BMIValue=$scope.BMIResult.toFixed(2)
 }
  $scope.caculateWHR=function(){
  	 $scope.WHRResult = $scope.biometery.WHRwaist / $scope.biometery.WHRhip;
     $scope.WHRValue=$scope.WHRResult.toFixed(2)
 }
 $scope.caculateBAI=function(){
  $scope.BAIHeightMeters = $scope.biometery.BAIheight / 100;
  $scope.denomentor = Math.sqrt($scope.BAIHeightMeters);
  $scope.numerator = $scope.biometery.BAIhip  * 2.54
  $scope.BAIResult = ($scope.numerator/$scope.denomentor)-18
  $scope.BAIResult = ($scope.numerator/($scope.BAIHeightMeters *$scope.denomentor)) - 18;
  $scope.BAIValue =  $scope.BAIResult.toFixed(2) + "%"

 }
 $scope.saveBtnClicked=false;

$scope.addBioMetery=function(){
  $scope.saveBtnClicked=true;

  if($scope.biometeryForm.systolic!="" && $scope.biometeryForm.diastolic!="" && $scope.biometeryForm.temperature!="" && $scope.biometeryForm.extrasystolic!="" && $scope.biometeryForm.irregularvalue!=""){
    alert("inn");
 if(localStorage.getItem("fetchBioMetric")=="Update"){
 	               	 DBService.updateData(queries.updateRecord.updateBioMetery,[$scope.biometeryForm.systolic,$scope.biometeryForm.diastolic,$scope.biometeryForm.temperature,$scope.biometeryForm.extrasystolic,$scope.biometeryForm.irregularvalue,$scope.bioMetericId]).then(function(res){

                });
 	}
 	else{
 		
  DBService.writeData(queries.insertRecord.addBioMetery,[$scope.biometeryForm.systolic,$scope.biometeryForm.diastolic,$scope.biometeryForm.temperature,$scope.biometeryForm.extrasystolic,$scope.biometeryForm.irregularvalue,$scope.WN.emailid]).then(function(res){
              localStorage.setItem("fetchBioMetric","Update"); 
              DBService.readData(queries.readRecord.biometeryList,[$scope.WN.emailid]).then(function(res){
                    $scope.details=res.rows.item(0);
                  
                    $scope.biometeryForm=$scope.details;
                $scope.bioMetericId =  $scope.biometeryForm.biometeryid;


                });
  DBService.readData(queries.readRecord.biometeryList,[$scope.WN.emailid]).then(function(res){

						 		$scope.biometeryForm=[];
						 			$scope.details=res.rows.item(0);
                  
                    $scope.biometeryForm=$scope.details;
                $scope.bioMetericId =  $scope.biometeryForm.biometeryid;

						 		});
      
                });
 	}



       }
       
}
            
 });
