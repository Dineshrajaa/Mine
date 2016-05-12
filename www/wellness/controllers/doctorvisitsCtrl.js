angular.module('starter.controllers')

.controller('doctorvisitsCtrl', function($scope,$state,$stateParams,DBService,$ionicHistory,$ionicPopup) {


  $scope.id=$stateParams.myParam.id;
   $scope.date=new Date();

if(localStorage.getItem("navigation")=="edit"){
DBService.readData(queries.readRecord.visitsedithistory,[$scope.id]).then(function(res){

	                  $scope.details=res.rows.item(0);
                  
	                  $scope.visits=$scope.details;
                    $scope.visits.date=new Date($scope.details.date);
                  
});
        
}



  $scope.visits={date:'',
                subjectmatter:'',
                provider:'',
                carefacility:'',
                summary:'',
                biometry:'',
                tests:'',
                currentcondition:'',
                drugs:'',
                documents:'',
                comments:''

  };

  $scope.visits.date=new Date($scope.date);

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
          $scope.visits.emailid=$stateParams.myParam.emailid;
          $scope.visits.type=null;
            }


$scope.saveBtnClicked=false;

             $scope.saveVisits=function(){
      //alert(localStorage.getItem("navigation"));
$scope.saveBtnClicked=true;
      if($scope.visits.subjectmatter!="" && $scope.visits.provider!=""){
        if(localStorage.getItem("navigation")=="edit"){
      

	


	 DBService.updateData(queries.updateRecord.updatevisits,[$scope.visits.date,$scope.visits.subjectmatter,$scope.visits.provider,$scope.visits.carefacility,$scope.visits.summary,$scope.visits.biometry,$scope.visits.tests,$scope.visits.currentcondition,$scope.visits.drugs,$scope.visits.documents,$scope.visits.comments,$scope.id]).then(function(res){
		
                                                                                                                                                                                        
               params={"myParam":{"emailid":$scope.visits.emailid}} ;    
              $state.go('menu.doctorvisitlist',params);
                });

 }

else{
  
  DBService.writeData(queries.insertRecord.addvisits,[$scope.visits.date,$scope.visits.subjectmatter,$scope.visits.provider,$scope.visits.carefacility,$scope.visits.summary,$scope.visits.biometry,$scope.visits.tests,$scope.visits.currentcondition,$scope.visits.drugs,$scope.visits.documents,$scope.visits.comments,$scope.visits.emailid]).then(function(res){
              
                                                                                                                                                                                        
              params={"myParam":{"emailid":$scope.visits.emailid}} ;    
              $state.go('menu.doctorvisitlist',params);
                });
}
}
       }


                       $scope.delete=function(){

DBService.deleteData(queries.deleteRecord.deletevisitshistory,[$scope.id]).then(function(res){
  
 $state.go('menu.doctorvisitlist',params);


});

 

}
        
       

            
 });
