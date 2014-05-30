
var  connection= angular.module('app.connection', ['ngRoute']);

 
connection.controller('connectionCtrl', ['$scope','$route', '$routeParams','$location', 'Connection', '$state', 

    function($scope, $routeParams, $route, $location, Connection ,$state) {


        $scope.setConnData=function(con){
            $scope.id=con.id;
            $scope.x1=con.x1;
            $scope.x2=con.x2;
            $scope.y1=con.y1;
            $scope.y2=con.y2;

           // console.log('init',cO);
        }


        $scope.create = function() {
            var connection=Connection.salva({cObject:cObjectId}, function(){
              console.log("newAction", connection);
                //$scope.$parent.cObjects.push(cObject);
               $scope.$parent.selectedCObject.connections.push(connection);
            });
        }


        $scope.delete=function(id){
            for(i=0;i<$scope.$parent.connectionsid.length;i++){


              if ($scope.$parent.connections[i].id==id){
                Connection.delete({
                  id:id 
                });
                $scope.$parent.connections.splice(i,1)
                $scope.$parent.connectionsid.splice(i,1)
              }
            }
        }

        $scope.highlight=function(connection){
          $scope.$parent.highlightConnection(connection.id);
        }
        $scope.looseFocus=function(){
          $scope.$parent.highlightConnection(0);
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


