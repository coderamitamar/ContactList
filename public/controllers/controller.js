var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',
	function ($scope,$http){
		var refresh=function(){
			$http.get('/contacts').success(function (response){
				$scope.contactlist=response;
				$scope.contact="";
			});
		};
		refresh();
		$scope.addContact=function (){
			if($scope.contact.name!=undefined && $scope.contact.name!=""){
				$http.post('/contacts',$scope.contact).success(function (response){
					refresh();
				});
			}
		};
		$scope.removeContact=function (id){
			$http.delete('/contacts/'+id).success(function (response){
				refresh();
			});
		};
		$scope.editContact=function (id){
			$http.get('/contacts/'+id).success(function (response){
				$scope.contact=response;
			});
		};
		$scope.updateContact=function (){
			if($scope.contact._id!=undefined){
				$http.put('/contacts/'+$scope.contact._id,$scope.contact).success(function (response){
					refresh();
				});
			}
		};
		$scope.clear=function (){
			$scope.contact="";
		};
	}
]);