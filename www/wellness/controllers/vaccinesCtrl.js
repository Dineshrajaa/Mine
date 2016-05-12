angular.module('starter.controllers')

.controller('vaccinesCtrl', function($scope,$state,$stateParams,DBService,$rootScope,$ionicHistory,$ionicPopup) {
	$scope.id=$stateParams.myParam.id;
  $scope.date=new Date();

if(localStorage.getItem("navigation")=="edit"){
DBService.readData(queries.readRecord.vaccinesedithistory,[$scope.id]).then(function(res){


	                 $scope.details=res.rows.item(0);
                   
	                
	                 $scope.vaccines=$scope.details;


                   
                   // if($scope.details.refdate=="undefined"){
                   //  $scope.vaccines.refdate=new Date($scope.date);
                   // }
                   // else{
                   //  $scope.vaccines.refdate=new Date($scope.details.refdate);
                   // }

                   // if($scope.details.vaccinedate=="undefined"){
                   //  $scope.vaccines.vaccinedate=new Date($scope.date);
                   // }
                   // else{
                   //  $scope.vaccines.vaccinedate=new Date($scope.details.vaccinedate);
                   // }
						 		
						 	$scope.vaccines.vaccinedate=new Date($scope.details.vaccinedate);
              $scope.vaccines.refdate=new Date($scope.details.refdate);

						 		});
}
$scope.vaccines=[];

$scope.vaccines={name:'',
                 vaccinedate:'',
                 type:'',
                 vaccinegroup:'',
                 refdate:'',
                 quantity:'',
                 comments:'',
                 emailid:'',
                 type:''

};

  $scope.vaccines.vaccinedate=new Date($scope.date);
  $scope.vaccines.refdate=new Date($scope.date);


$scope.GoBack = function() {
    $ionicHistory.goBack();
  };

       $scope.addVaccines=function(){

         $state.go('menu.vaccineslist');     	
       }
   if($stateParams.myParam!=null){
          $scope.vaccines.emailid=$stateParams.myParam.emailid;
           $scope.vaccines.type=null;
           
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


       $scope.saveVaccine=function(){
      //alert(localStorage.getItem("navigation"));
      $scope.saveBtnClicked=true;

      if($scope.vaccines.name!="" && $scope.vaccines.quantity!="")
      {
        if(localStorage.getItem("navigation")=="edit"){
      

	


	 DBService.updateData(queries.updateRecord.updateVaccines,[$scope.vaccines.name,$scope.vaccines.vaccinedate,$scope.vaccines.type,$scope.vaccines.vaccinegroup,$scope.vaccines.refdate,$scope.vaccines.quantity,$scope.vaccines.comments,$scope.id]).then(function(res){
		
                                                                                                                                                                                        
               params={"myParam":{"emailid":$scope.vaccines.emailid}} ;    
              $state.go('menu.vaccineslist',params);
                });

 }

else{
  
  DBService.writeData(queries.insertRecord.addvaccines,[$scope.vaccines.name,$scope.vaccines.vaccinedate,$scope.vaccines.type,$scope.vaccines.vaccinegroup,$scope.vaccines.refdate,$scope.vaccines.quantity,$scope.vaccines.comments,$scope.vaccines.emailid]).then(function(res){
              
                                                                                                                                                                                        
              params={"myParam":{"emailid":$scope.vaccines.emailid}} ;    
              $state.go('menu.vaccineslist',params);
                });
}
}
       }
         

                                       $scope.delete=function(){

DBService.deleteData(queries.deleteRecord.deletevaccineshistory,[$scope.id]).then(function(res){
  
  $state.go('menu.vaccineslist',params);


});

 

}
       

            
 });
