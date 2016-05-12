angular.module('starter.services', [])
.run(function($rootScope){

	$rootScope.db = null;

})

.factory('DBService', function($rootScope,$q) {
	function readData(sqlQuery,params){
		var isWebView = ionic.Platform.isWebView();
		if(window.cordova!=undefined){
			if($rootScope.db==null)
				$rootScope.db=window.sqlitePlugin.openDatabase({name: "mywellnessdb.db",createFromLocation: 1});

		}else{
			if($rootScope.db==null){
				createTables();
			}
		}
		var deferred = $q.defer();

		$rootScope.db.transaction(function(tx) {
			tx.executeSql(sqlQuery, params, function(tx, res) {
				deferred.resolve(res);
			});
		});
		return deferred.promise;
	}


	function writeData(sqlQuery,params){
		var isWebView = ionic.Platform.isWebView();
		if(window.cordova!=undefined){
			if($rootScope.db==null)
				$rootScope.db=window.sqlitePlugin.openDatabase({name: "mywellnessdb.db",createFromLocation: 1});

		}else{
			if($rootScope.db==null){
				createTables();
			}


		}

	var deferred = $q.defer();

	$rootScope.db.transaction(function(tx) {
		tx.executeSql(sqlQuery, params, function(tx, res) {
			deferred.resolve(res);
		});
	});
	return deferred.promise;



}


function updateData(sqlQuery,params)
{


	if(window.cordova!=undefined){
		if($rootScope.db==null)
			$rootScope.db=window.sqlitePlugin.openDatabase({name: "mywellnessdb.db",createFromLocation: 1});

	}else{
		if($rootScope.db==null){
		createTables();
		}
	}

	var deferred = $q.defer();

	$rootScope.db.transaction(function(tx) {
		tx.executeSql(sqlQuery, params, function(tx, res) {
																								 //alert(res);
																								 deferred.resolve(res);
																								});
	});
	return deferred.promise;
}


function deleteData(sqlQuery,params)
{
	var isWebView = ionic.Platform.isWebView();
	if(window.cordova!=undefined){
		if($rootScope.db==null)
			$rootScope.db=window.sqlitePlugin.openDatabase({name: "mywellnessdb.db",createFromLocation: 1,iosDatabaseLocation: 'default'});

	}else{
		if($rootScope.db==null){
	createTables();
}
	}

	var deferred = $q.defer();

	$rootScope.db.transaction(function(tx) {
		tx.executeSql(sqlQuery, params, function(tx, res) {
			deferred.resolve(res);
		});
	});
	return deferred.promise;
}

function createTables(){
	$rootScope.db = openDatabase('mywellnessdb.db', '1.0', 'Test DB',  2* 1024 * 1024);
	$rootScope.db.transaction(function (tx) {  
		tx.executeSql(queries.createTable.vaccines);
		tx.executeSql(queries.createTable.userprofiles);
		tx.executeSql(queries.createTable.employment);
		tx.executeSql(queries.createTable.medicalHistory);
		tx.executeSql(queries.createTable.allergies);
		tx.executeSql(queries.createTable.drugs);
		tx.executeSql(queries.createTable.social);
		tx.executeSql(queries.createTable.surgery);
		tx.executeSql(queries.createTable.visits);
		tx.executeSql(queries.createTable.healthcare);
		tx.executeSql(queries.createTable.insurance);
		tx.executeSql(queries.createTable.emergency);
		tx.executeSql(queries.createTable.events);
		tx.executeSql(queries.createTable.notes);
		tx.executeSql(queries.createTable.reminders);
		tx.executeSql(queries.createTable.biometery);
		tx.executeSql(queries.createTable.condition);
		tx.executeSql(queries.createTable.blood);
		tx.executeSql(queries.createTable.medical);
		tx.executeSql(queries.createTable.bioSignal);


		//
	});
}


return {
	readData: readData,
	writeData: writeData,
	updateData: updateData,
	deleteData: deleteData
};
})

.factory('myService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

});

