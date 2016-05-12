angular.module('starter.controllers')

.controller('allergiesCtrl', function($scope,$state,$stateParams,DBService,$ionicHistory,$ionicPopup) {
//$scope.id=$stateParams.myParam.id;
//added date function

$scope.id=$stateParams.myParam.id;
 $scope.startdate=new Date();
 $scope.enddate=new Date();


//alert(JSON.stringify($scope.id));

  if(localStorage.getItem("navigation")=="edit"){
            DBService.readData(queries.readRecord.allergiesedithistory,[$scope.id]).then(function(res){
    $scope.details=res.rows.item(0);

     if($scope.details.name!=""){
      
                                                                                         
      $scope.allergies=$scope.details;
                                                                                         
 //      if ($scope.details.startdate=="" && $scope.details.enddate!=""){
                                                                                                                                                                        
 //      $scope.allergies.startdate=new Date($scope.startdate);
 //      $scope.allergies.enddate=new Date($scope.details.enddate);
                                                                                         
 //       }
                                                                                         
 //     if($scope.details.enddate=="" && $scope.details.startdate!=""){
                                                                                        
                                                                                        
 //    $scope.allergies.enddate=new Date($scope.enddate);
 //    $scope.allergies.startdate=new Date($scope.details.startdate);
                                                                                         
 //   }
                                                                                         
 //    if(($scope.details.startdate && $scope.details.enddate)==""){
                                                                                        
 //   $scope.allergies.startdate=new Date($scope.startdate);
 //   $scope.allergies.enddate=new Date($scope.enddate);
                                                                                         
                                                                                         
 //  } 
                                                                                         
 //   else{
                                                                                        
 // $scope.allergies.startdate=new Date($scope.details.startdate);
 //  $scope.allergies.enddate=new Date($scope.details.enddate);
 //  }

 $scope.allergies.startdate=new Date($scope.details.startdate);
 $scope.allergies.enddate=new Date($scope.details.enddate);
                                                                                         
 }
                                                                                                                                                                                 
});
}
            




$scope.allergies={name:'',
                  result:'',
                  severity:'',
                  startdate:'',
                  enddate:'',
                  symptoms:'',
                  priscribeddrug:'',
                  comments:'',
                  emailid:"",
                  type:""

};

 $scope.allergies.startdate=new Date($scope.startdate);
 $scope.allergies.enddate=new Date($scope.enddate);

$scope.saveBtnClicked=false;

$scope.GoBack = function() {
    $ionicHistory.goBack();
  };


if($stateParams.myParam!=null){
          $scope.allergies.emailid=$stateParams.myParam.emailid;
          $scope.allergies.type=null;

            }





       $scope.saveAllergy=function(){

$scope.saveBtnClicked=true;

        if($scope.allergies.name!="" && $scope.allergies.result!="")
        {
      //alert(localStorage.getItem("navigation"));
        if(localStorage.getItem("navigation")=="edit"){




	 DBService.updateData(queries.updateRecord.updateAllergies,[$scope.allergies.name,$scope.allergies.result,$scope.allergies.severity,$scope.allergies.startdate,$scope.allergies.enddate,$scope.allergies.symptoms,$scope.allergies.priscribeddrug,$scope.allergies.comments,$scope.id]).then(function(res){
		
                                                                                                                                                                                        
               params={"myParam":{"emailid":$scope.allergies.emailid}} ;    
              $state.go('menu.allergieslist',params);
             
                });

 }

else{

  
  DBService.writeData(queries.insertRecord.addallergies,[$scope.allergies.name,$scope.allergies.result,$scope.allergies.severity,$scope.allergies.startdate,$scope.allergies.enddate,$scope.allergies.symptoms,$scope.allergies.priscribeddrug,$scope.allergies.comments,$scope.allergies.emailid]).then(function(res){
              
                                                                                                                                                                                        
              params={"myParam":{"emailid":$scope.allergies.emailid}} ;    
              $state.go('menu.allergieslist',params);
             
                });
}

}
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

DBService.deleteData(queries.deleteRecord.deleteallergieshistory,[$scope.id]).then(function(res){
  
$state.go('menu.allergieslist',params);

});

 

}
        

            
 });
