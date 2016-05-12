angular.module('starter.controllers')

.controller('medicaltestsCtrl', function($scope,$state,$stateParams,$rootScope,DBService,$ionicNavBarDelegate,$ionicPopup) {

               $scope.bloodItems=[];
               $scope.currentbloodid;
               $scope.currentmedicalid;
               $scope.currentbiosignalid;
               $scope.currenttitle;
               $scope.editBloodId="";
               $scope.title="";
               $scope.medicalTestListItems={};
               $scope.bioSignalListItems={};
               $scope.medicalTestFormItems={};
               $scope.bioSignalFormItems={};

               
               $scope.IsSave = true;
	           $scope.IsDone = false;
	           $scope.IsDone = $scope.IsDone ? false : true;
			   $scope.IsSave = $scope.IsSave ? false : true;
			   $scope.IsSave1 = true;
	           $scope.IsDone1 = false;
	           $scope.IsDone1 = $scope.IsDone1 ? false : true;
			   $scope.IsSave1 = $scope.IsSave1 ? false : true;
			   $scope.IsSave2 = true;
	           $scope.IsDone2 = false;
	           $scope.IsDone2 = $scope.IsDone2 ? false : true;
			   $scope.IsSave2 = $scope.IsSave2 ? false : true;
        
$scope.changeTitle=function(item){
	$scope.currenttitle=item;

	if(item=="blood")
	{
		
		$scope.title="Blood Tests";
		$scope.getBlood();
	}

	if(item=="medical"){
		$scope.title="Medical Tests";
		$scope.getMedical();
	}
	if(item=="biosignal"){
		$scope.title="Biosignal Tests";
		$scope.getBioSignal();
	}
	
}
       
$scope.WN={"emailid":$stateParams.myParam.emailid};
      $scope.blood={hemoglobin:'',
                             name:'',
                             date:'',
                             results:'',
                             comments:'',
                             glucose:'',
                             antigen:'',
                             cholesterol:''

               };

               $scope.medicalTestFormItems={
               	name:'',
               	medicalTesttype:'Type 1',
               	medicalTestDate:'',
               	medicalTestReason:'',
               	mediclTestComment:''
               };

               $scope.bioSignalFormItems={
               	name:'',
               	bioSignaltype:'',
               	bioSignalDate:'',
               	bioSignalReason:'',
               	bioSignalResult:'',
               	bioSignalComment:''
               };


$scope.date=new Date();
$scope.blood.date=$scope.date;
$scope.medicalTestFormItems.medicalTestDate=$scope.date;
$scope.bioSignalFormItems.bioSignalDate=$scope.date;



$scope.getBlood=function(){

         DBService.readData(queries.readRecord.blood,[$scope.WN.emailid]).then(function(res){
         	
						 	
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.bloodItems[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.blood,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.bloodItems[i]=temp;
						 			}

						 		});
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
    	if($scope.currenttitle=="blood"){
      $scope.deleteBlood($scope.currentbloodid);
  }

  else if($scope.currenttitle=="medical"){
$scope.medicalDelete($scope.currentmedicalid);

  }

  else if($scope.currenttitle=="biosignal"){
$scope.bioSignalDelete($scope.currentbiosignalid);

  }

    }
     if(res==true) {
       
     } 
   });
 };






   $scope.editBlood=function(bloodid){
   	$scope.currentbloodid=bloodid;
      
              $scope.editBloodId =  bloodid;
            
              DBService.readData(queries.readRecord.bloodlist,[$scope.editBloodId]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.blood=$scope.details;
	                 if($scope.details.hemoglobin=="true"){
	                 	$scope.blood.hemoglobin=true;
	                 }
	                 if($scope.details.glucose=="true"){
	                 	$scope.blood.glucose=true;
	                 }
	                 if($scope.details.antigen=="true"){
	                 	$scope.blood.antigen=true;
	                 }
	                 if($scope.details.cholesterol=="true"){
                        $scope.blood.cholesterol=true;
	                 }
	                 //$scope.blood.date=new Date($scope.details.date);
	                 $scope.blood.date=new Date($scope.details.date);
                    
                    
	                 

						 		
						 	$scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;
						 		});

               }


 $scope.deleteBlood=function(bloodid){

DBService.deleteData(queries.deleteRecord.deletebloodlist,[bloodid]).then(function(res){
	
	$scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;

DBService.readData(queries.readRecord.blood,[$scope.WN.emailid]).then(function(res){

  	                             $scope.bloodItems=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.bloodItems[i]=temp;
						 			}

						 		});

});
$scope.blood={hemoglobin:'',
                             name:'',
                             date:'',
                             results:'',
                             comments:'',
                             glucose:'',
                             antigen:'',
                             cholesterol:''

               };
               $scope.blood.date=$scope.date;

}


$scope.BloodsaveBtnClicked=false;


$scope.saveBlood=function(){
	$scope.BloodsaveBtnClicked=true;

	if($scope.blood.name!="" && $scope.blood.results!=""){
	
	
  DBService.writeData(queries.insertRecord.addblood,[$scope.blood.hemoglobin,$scope.blood.name,$scope.blood.date,$scope.blood.results,$scope.blood.comments,$scope.blood.glucose,$scope.blood.antigen,$scope.blood.cholesterol,$scope.WN.emailid]).then(function(res){

$scope.blood={hemoglobin:'',
                             name:'',
                             date:'',
                             results:'',
                             comments:'',
                             glucose:'',
                             antigen:'',
                             cholesterol:''

               };
  $scope.blood.date=$scope.date;
              
  DBService.readData(queries.readRecord.blood,[$scope.WN.emailid]).then(function(res){

  	                          
						 		     $scope.bloodItems=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.bloodItems[i]=temp;
						 			}

						 		});
      
                });
}

       }


        $scope.updateBlood=function(){
        	$scope.BloodsaveBtnClicked=true;
        	if($scope.blood.name!="" && $scope.blood.results!=""){
          
            	 DBService.updateData(queries.updateRecord.updateblood,[$scope.blood.hemoglobin,$scope.blood.name,$scope.blood.date,$scope.blood.results,$scope.blood.comments,$scope.blood.glucose,$scope.blood.antigen,$scope.blood.cholesterol,$scope.editBloodId]).then(function(res){
            	 	//$scope.blood=[];
            	 	$scope.blood={hemoglobin:'',
                             name:'',
                             date:'',
                             results:'',
                             comments:'',
                             glucose:'',
                             antigen:'',
                             cholesterol:''

               };

            	 	$scope.blood.date=$scope.date;

		DBService.readData(queries.readRecord.blood,[$scope.WN.emailid]).then(function(res){
                            $scope.IsDone = $scope.IsDone ? false : true;
							$scope.IsSave = $scope.IsSave ? false : true;
  	                              $scope.bloodItems=[];
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.bloodItems[i]=temp;
						 			}

						 		});

                });
            	}

            } 



   $scope.selectTabWithIndex = function(index) {
    $ionicTabsDelegate.select(index);
  }



$scope.getMedical=function(){
        
           DBService.readData(queries.readRecord.medicalTest,[$scope.WN.emailid]).then(function(res){
         	
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.medicalTestListItems[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.medicalTest,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.medicalTestListItems[i]=temp;
						 			}

						 		});
						 	});

}

                        $scope.medicalEdit=function(medicalId){
                        	$scope.currentmedicalid=medicalId;

              $scope.EditMedicalId =  medicalId;
              DBService.readData(queries.readRecord.medicalTestlist,[medicalId]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.medicalTestFormItems=$scope.details;
	                  $scope.medicalTestFormItems.medicalTestDate=new Date($scope.details.medicalTestDate);

					        $scope.IsDone1 = $scope.IsDone1 ? false : true;
							$scope.IsSave1 = $scope.IsSave1 ? false : true;	
						 
						 		});

               }
                              $scope.medicalDelete=function(medicalId){
								DBService.deleteData(queries.deleteRecord.deletemedicallist,[medicalId]).then(function(res){
	
	                        $scope.IsDone1 = $scope.IsDone1 ? false : true;
							$scope.IsSave1 = $scope.IsSave1 ? false : true;

  	                             $scope.medicalTestListItems=[];
						 		$scope.medicalTestFormItems={
               	name:'',
               	medicalTesttype:'',
               	medicalTestDate:'',
               	medicalTestReason:'',
               	mediclTestComment:''
               };

               $scope.medicalTestFormItems.medicalTestDate=$scope.date;
								$scope.getMedical();

  

});

 $scope.medicalTestFormItems={};

}

$scope.MedicalsaveBtnClicked=false;

       $scope.updateMedicalTest=function(){

$scope.MedicalsaveBtnClicked=true;
       	if($scope.medicalTestFormItems.name!="" && $scope.medicalTestFormItems.medicalTestReason!=""){
            
            		 DBService.updateData(queries.updateRecord.updateMedical,[$scope.medicalTestFormItems.name,$scope.medicalTestFormItems.medicalTesttype,$scope.medicalTestFormItems.medicalTestDate,$scope.medicalTestFormItems.medicalTestReason,$scope.medicalTestFormItems.mediclTestComment,$scope.EditMedicalId]).then(function(res){
			         $scope.IsDone1 = $scope.IsDone1 ? false : true;
				     $scope.IsSave1 = $scope.IsSave1 ? false : true;
			       //$scope.medicalTestFormItems=[];
			       $scope.medicalTestFormItems={
               	name:'',
               	medicalTesttype:'',
               	medicalTestDate:'',
               	medicalTestReason:'',
               	mediclTestComment:''
               };

               $scope.medicalTestFormItems.medicalTestDate=$scope.date;
                   localStorage.setItem("navigation","");      
                   $scope.getMedical(); 
                                                                                                                                                                 

                });
            		}

            		}

            
          $scope.saveMedicalTest=function(){


$scope.MedicalsaveBtnClicked=true;
          	if($scope.medicalTestFormItems.name!="" && $scope.medicalTestFormItems.medicalTestReason!=""){
            	  DBService.writeData(queries.insertRecord.addMedical,[$scope.medicalTestFormItems.name,$scope.medicalTestFormItems.medicalTesttype,$scope.medicalTestFormItems.medicalTestDate,$scope.medicalTestFormItems.medicalTestReason,$scope.medicalTestFormItems.mediclTestComment,$scope.WN.emailid]).then(function(res){
   //$scope.medicalTestFormItems=[];
    $scope.medicalTestFormItems={
               	name:'',
               	medicalTesttype:'',
               	medicalTestDate:'',
               	medicalTestReason:'',
               	mediclTestComment:''
               };

               $scope.medicalTestFormItems.medicalTestDate=$scope.date;
   $scope.getMedical();
      
                });
         }
           
       }

      $scope.getBioSignal=function(){
         
         DBService.readData(queries.readRecord.bioSignal,[$scope.WN.emailid]).then(function(res){
         	
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.bioSignalListItems[i]=temp;
						 			}

						 		});
         $rootScope.$on('$stateChangeSuccess',
						 	function(event, toState, toParams, fromState, fromParams){

						 	DBService.readData(queries.readRecord.bioSignal,[$scope.WN.emailid]).then(function(res){
						 		
						 		
						 			for(var i=0;i<res.rows.length;i++){
						 				var temp=res.rows.item(i);
						 		
						 				$scope.bioSignalListItems[i]=temp;
						 			}

						 		});
						 	});
 
	
}
    $scope.bioSignalEdit=function(bioSignalID){

$scope.currentbiosignalid=bioSignalID;
              $scope.EditBioSignalId =  bioSignalID;
              DBService.readData(queries.readRecord.bioSignallist,[bioSignalID]).then(function(res){

	                 $scope.details=res.rows.item(0);
	                
	                 $scope.bioSignalFormItems=$scope.details;

	                  $scope.bioSignalFormItems.bioSignalDate=new Date($scope.details.bioSignalDate);

	                  $scope.IsDone2 = $scope.IsDone2 ? false : true;
					  $scope.IsSave2 = $scope.IsSave2 ? false : true;	
					 		
						 
						 		});

               }


                              $scope.bioSignalDelete=function(bioSignalID){
DBService.deleteData(queries.deleteRecord.deleteBioSignallist,[bioSignalID]).then(function(res){
	                        $scope.IsDone2 = $scope.IsDone2 ? false : true;
							$scope.IsSave2 = $scope.IsSave2 ? false : true;	
	
$scope.bioSignalListItems={};
         $scope.bioSignalFormItems={
               	name:'',
               	bioSignaltype:'',
               	bioSignalDate:'',
               	bioSignalReason:'',
               	bioSignalResult:'',
               	bioSignalComment:''
               };

               $scope.bioSignalFormItems.bioSignalDate=$scope.date;
$scope.getBioSignal();
  

});

  $scope.bioSignalFormItems={};

}

       $scope.updateBioSignal=function(){
      
           
            		 DBService.updateData(queries.updateRecord.updateBioSignal,[$scope.bioSignalFormItems.name,$scope.bioSignalFormItems.bioSignaltype,$scope.bioSignalFormItems.bioSignalDate,$scope.bioSignalFormItems.bioSignalReason,$scope.bioSignalFormItems.bioSignalResult,$scope.bioSignalFormItems.bioSignalComment,$scope.EditBioSignalId]).then(function(res){
       
			 $scope.IsDone2 = $scope.IsDone2 ? false : true;
		     $scope.IsSave2 = $scope.IsSave2 ? false : true;	
			$scope.bioSignalFormItems={
               	name:'',
               	bioSignaltype:'',
               	bioSignalDate:'',
               	bioSignalReason:'',
               	bioSignalResult:'',
               	bioSignalComment:''
               };

               $scope.bioSignalFormItems.bioSignalDate=$scope.date;
			$scope.getBioSignal();
                                                                                                                                                                 

                });
            		
}
         
            $scope.saveBioSignal=function(){

            
            	  DBService.writeData(queries.insertRecord.addBiosignal,[$scope.bioSignalFormItems.name,$scope.bioSignalFormItems.bioSignaltype,$scope.bioSignalFormItems.bioSignalDate,$scope.bioSignalFormItems.bioSignalReason,$scope.bioSignalFormItems.bioSignalResult,$scope.bioSignalFormItems.bioSignalComment,$scope.WN.emailid]).then(function(res){
    $scope.bioSignalFormItems={
               	name:'',
               	bioSignaltype:'',
               	bioSignalDate:'',
               	bioSignalReason:'',
               	bioSignalResult:'',
               	bioSignalComment:''
               };

               $scope.bioSignalFormItems.bioSignalDate=$scope.date;
   $scope.getBioSignal();
     
                });
          
           
       }
            
 });
