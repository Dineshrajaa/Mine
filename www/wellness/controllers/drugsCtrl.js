angular.module('starter.controllers')

.controller('drugsCtrl', function($scope,$state,$stateParams,DBService,$ionicHistory,$ionicPopup) {

       $scope.id=$stateParams.myParam.id;
       $scope.date=new Date();

if(localStorage.getItem("navigation")=="edit"){
DBService.readData(queries.readRecord.drugsedithistory,[$scope.id]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.drugs=$scope.details;
						 		
                $scope.drugs.startdate=new Date($scope.details.startdate);
                $scope.drugs.enddate=new Date($scope.details.enddate);
                $scope.drugs.presstartdate=new Date($scope.details.presstartdate);
                $scope.drugs.presenddate=new Date($scope.details.presenddate);
                $scope.drugs.supstartdate=new Date($scope.details.supstartdate);
                $scope.drugs.supenddate=new Date($scope.details.supenddate);

						 	

						 		});

}
        
       
$scope.drugs=[];
$scope.drugs={name:'',
              quantity:'',
              frequency:'',
              reason:'',
              startdate:'',
              enddate:'',
              sideeffects:'',
              comments:'',
              presname:'',
              presquantity:'',
              presstartdate:'',
              presenddate:'',
              prescomments:'',
              supname:'',
              supquantity:'',
              supstartdate:'',
              supenddate:'',
              supcomments:''

};


 $scope.drugs.startdate=new Date($scope.date);
 $scope.drugs.enddate=new Date($scope.date);
 $scope.drugs.presstartdate=new Date($scope.date);
 $scope.drugs.presenddate=new Date($scope.date);
 $scope.drugs.supstartdate=new Date($scope.date);
 $scope.drugs.supenddate=new Date($scope.date);



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
          $scope.drugs.emailid=$stateParams.myParam.emailid;
            $scope.drugs.type=null;
            }
$scope.saveBtnClicked=false;

             $scope.saveDrugs=function(){
              $scope.saveBtnClicked=true;
      //alert(localStorage.getItem("navigation"));
      if($scope.drugs.name && $scope.drugs.quantity && $scope.drugs.presname && $scope.drugs.presquantity && $scope.drugs.supname && $scope.drugs.supquantity){
        if(localStorage.getItem("navigation")=="edit"){
    

	


	 DBService.updateData(queries.updateRecord.updatedrugs,[$scope.drugs.name,$scope.drugs.quantity,$scope.drugs.frequency,$scope.drugs.reason,$scope.drugs.startdate,$scope.drugs.enddate,$scope.drugs.sideeffects,$scope.drugs.comments,$scope.drugs.presname,$scope.drugs.presquantity,$scope.drugs.presstartdate,$scope.drugs.presenddate,$scope.drugs.prescomments,$scope.drugs.supname,$scope.drugs.supquantity,$scope.drugs.supstartdate,$scope.drugs.supenddate,$scope.drugs.supcomments,$scope.id]).then(function(res){
		
                                                                                                                                                                                        
               params={"myParam":{"emailid":$scope.drugs.emailid}} ;    
              $state.go('menu.drugslist',params);
                });

 }

else{
  
  DBService.writeData(queries.insertRecord.adddrugs,[$scope.drugs.name,$scope.drugs.quantity,$scope.drugs.frequency,$scope.drugs.reason,$scope.drugs.startdate,$scope.drugs.enddate,$scope.drugs.sideeffects,$scope.drugs.comments,$scope.drugs.presname,$scope.drugs.presquantity,$scope.drugs.presstartdate,$scope.drugs.presenddate,$scope.drugs.prescomments,$scope.drugs.supname,$scope.drugs.supquantity,$scope.drugs.supstartdate,$scope.drugs.supenddate,$scope.drugs.supcomments,$scope.drugs.emailid]).then(function(res){
              
                                                                                                                                                                                        
              params={"myParam":{"emailid":$scope.drugs.emailid}} ;    
              $state.go('menu.drugslist',params);
                });
}
}
       }

                       $scope.delete=function(){

DBService.deleteData(queries.deleteRecord.deletedrugshistory,[$scope.id]).then(function(res){
  
$state.go('menu.drugslist',params);


});

 

}


            
 });
