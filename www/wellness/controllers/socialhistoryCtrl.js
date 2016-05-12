angular.module('starter.controllers')

.controller('socialhistoryCtrl', function($scope,$state,$stateParams,DBService,$ionicHistory,$timeout,$ionicPopup) {
   $scope.date=new Date();
   if(localStorage.getItem("navigation")=="edit"){
       $scope.id=$stateParams.myParam.id;
      


DBService.readData(queries.readRecord.socialedithistory,[$scope.id]).then(function(res){

                    $scope.details=res.rows.item(0);


                  
                    $scope.social=$scope.details;
                   
                    if(res.rows.item(0).tobbacoUse=="true"){
                     $scope.social.tobbacoUse=true;
                    }

                    if(res.rows.item(0).tatoos=="true"){
                      $scope.social.tatoos=true;
                    }
                  
              $scope.social.startDate=new Date($scope.details.startDate);
              $scope.social.endDate=new Date($scope.details.endDate);
                    
                });
}
$scope.social=[];
           
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


$scope.social={tobbacoUse:'',
packsPerDay:'',
numberOfYears:'',
yearsQuit:'',
alcoholUse:'1',
ReDrugUse:'1',
bloodTransfusion:'',
spDiet:'',
reExcercise:'',
sexTransmitted:'',
crCondition:'',
startDate:'',
endDate:'',
comments:''


};


 $scope.social.startDate=new Date($scope.date);
 $scope.social.endDate=new Date($scope.date);


if($stateParams.myParam!=null){
          $scope.social.emailid=$stateParams.myParam.emailid;
             $scope.social.type=null;
            }
$scope.saveBtnClicked=false;

         $scope.saveHistory=function(){
          $scope.saveBtnClicked=true;
          if($scope.social.packsPerDay!="" && $scope.social.numberOfYears!=""){
         	 
        if(localStorage.getItem("navigation")=="edit"){
                                                                                                        
	 DBService.updateData(queries.updateRecord.updateSocial,[$scope.social.tobbacoUse,$scope.social.packsPerDay,$scope.social.numberOfYears,$scope.social.yearsQuit,$scope.social.alcoholUse,$scope.social.ReDrugUse,$scope.social.tatoos,$scope.social.bloodTransfusion,$scope.social.spDiet,$scope.social.reExcercise,$scope.social.sexTransmitted,$scope.social.crCondition,$scope.social.startDate,$scope.social.endDate,$scope.social.comments,$scope.id]).then(function(res){
		
                                                                                                                                                                                        
               params={"myParam":{"emailid":$scope.social.emailid}} ;    
              $state.go('menu.sociallist',params);
                });

 }

else{
	                 
 
  DBService.writeData(queries.insertRecord.addsocial,[$scope.social.tobbacoUse,$scope.social.packsPerDay,$scope.social.numberOfYears,$scope.social.yearsQuit,$scope.social.alcoholUse,$scope.social.ReDrugUse,$scope.social.tatoos,$scope.social.bloodTransfusion,$scope.social.spDiet,$scope.social.reExcercise,$scope.social.sexTransmitted,$scope.social.crCondition,$scope.social.startDate,$scope.social.endDate,$scope.social.comments,$scope.social.emailid]).then(function(res){
              
                                                                                                                                                                     
              params={"myParam":{"emailid":$scope.social.emailid}} ;    
              $state.go('menu.sociallist',params);
               });
}
      
      } 
}

                              $scope.delete=function(sid){

DBService.deleteData(queries.deleteRecord.deletesocialhistory,[$scope.id]).then(function(res){
  
 $state.go('menu.sociallist',params);
});

 

}
            
 });
