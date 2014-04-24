
var  connection= angular.module('app.connection', ['ngRoute']);

 
connection.controller('connectionCtrl', ['$scope','$route', '$routeParams','$location', 'Connection', '$state', 

    function($scope, $routeParams, $route, $location, Connection ,$state) {

         $scope.$watch('$scope.$parent.selectedConnection', function () {//wait until the variable is initialized
            console.log('update selectedConnection',$scope.$parent.selectedConnection);
            
            if($scope.$parent.selectedConnection){
                $scope.id=$scope.$parent.selectedConnection.id; 
                $scope.name=$scope.$parent.selectedConnection.codeVariables;
                $scope.codeVariables= $scope.$parent.selectedConnection.codeVariables;
                $scope.codeSetup= $scope.$parent.selectedConnection.codeSetup;
                $scope.codeFunction= $scope.$parent.selectedConnection.codefunction;
            }
         })    

        $scope.create = function() {
          console.log("create");
            var cObjectId=$scope.$parent.selectedCObject.id; 
                
                console.log("create trigger",cObjectId);

            var connection=Connection.salva({cObject:cObjectId}, function(){
              console.log("newAction", connection);
                //$scope.$parent.cObjects.push(cObject);
               $scope.$parent.selectedCObject.connections.push(connection);
            });
        }

        $scope.delete=function(){

            var arrIndex=$scope.$parent.selectedCObject.connections.indexOf($scope.$parent.selectedConnection);
            $scope.$parent.selectedCObject.connections.splice(arrIndex,1);
            console.log(arrIndex);

            Connection.delete({
              id:$scope.id 
            });
            $scope.$parent.selectConnection(null);
            $state.go('edit.addcObject');
        }

       



    }
]);


 connection.factory('Connection', ['$resource',function($resource){
     return $resource('/connection/:id', {}, 
        {
            
            'salva': {method:'POST', 
                      params:{project:'@projectID',
                              end:'@endID',
                              start:'@startID'
                              }, 
                      url:'/connections/create/' },

            'delete': {method:'DELETE', params:{end:'@id'}, url:'/connections/destroy/:id' },
            'getConnections': {method:'GET', params:{project:'@projectID'}, url:'/connections/getConnections'},


             

        });

}]);


